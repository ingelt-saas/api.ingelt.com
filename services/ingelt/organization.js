const express = require("express");
const organizationUtil = require("../../utils/organization");
const { memoryStorage } = require("multer");
const multer = require("multer");
const organizationService = express.Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require("../../aws/upload");
const orgImagesUtils = require("../../utils/orgImages");
const adminUtil = require("../../utils/admin");
const deleteFile = require("../../aws/delete");

// create new organization
organizationService.post("/", async (req, res) => {

  try {

    const instituteImages = req.body.images;
    const newInstitute = req.body;
    newInstitute.ownerName = newInstitute.partnerName;

    const newAdmin = {
      name: newInstitute.partnerName,
      phoneNo: newInstitute.partnerPhoneNo,
      email: newInstitute.partnerEmail,
    };

    // get institute by email & get admin by email
    const getInstitute = await organizationUtil.readByEmail(newInstitute.email);
    const getAdmin = await adminUtil.readByEmail(newInstitute.partnerEmail);

    if (getInstitute) {
      return res.status(409).json({ message: 'Institute already exists at this email' });
    }

    if (getAdmin) {
      return res.status(409).json({ message: 'Admin already exists at this email' });
    }

    let institute = await organizationUtil.create(newInstitute);
    newAdmin.organizationId = institute.id;
    await adminUtil.create(newAdmin); // create new admin

    if (Array.isArray(instituteImages) && instituteImages.length > 0) {
      let uploadOrgImages = instituteImages.map((i) => ({ name: i, organizationId: institute.id }));
      await orgImagesUtils.create(uploadOrgImages); // insert institute images
    }

    res.status(201).json({ message: "Created" });

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}
);

// get all organization
organizationService.get("/", async (req, res) => {
  try {
    const { s, pageNo, limit } = req.query;
    const result = await organizationUtil.read(parseInt(pageNo), parseInt(limit), s);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// apply organization
organizationService.post("/apply", async (req, res) => {
  try {
    const result = await organizationUtil.apply(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// search organizations
organizationService.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const result = await organizationUtil.search(searchQuery);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get a organization by organization id
organizationService.get("/:orgId", async (req, res) => {
  try {
    const result = await organizationUtil.readByIdWithAdmin(req.params.orgId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// update organization
organizationService.put("/:orgId", async (req, res) => {
  try {

    const updateInstitute = req.body;
    const updateImages = updateInstitute.images;

    if (updateInstitute.email) {
      // get institute by email
      const getInstitute = await organizationUtil.readByEmail(updateInstitute.email);
      if (getInstitute) {
        return res.status(409).json({ message: 'Institute already exists at this email' });
      }
    }

    if (updateInstitute.partnerEmail) {
      // get admin by email
      const getAdmin = await adminUtil.readByEmail(updateInstitute.partnerEmail);
      if (getAdmin) {
        return res.status(409).json({ message: 'Admin already exists at this email' });
      }
    }

    if (updateImages && Array.isArray(updateImages)) {
      const getImages = await orgImagesUtils.getImagesByOrg(req.params.orgId);
      let deletedImages = [];
      let imagesData = [];

      // check update images
      for (let image of updateImages) {
        if (!getImages.find(i => i.name === image)) {
          imagesData.push({ name: image, organizationId: req.params.orgId });
        }
      }

      // images insert into org images
      await orgImagesUtils.create(imagesData);

      // check which image deleted 
      for (let image of getImages) {
        if (!updateImages.find(i => i === image.name)) {
          deletedImages.push(image.name);
          await orgImagesUtils.delete(image.id);
        }
      }

      // image delete form cloud
      for (let image of deletedImages) {
        await deleteFile(image);
      }

    }

    // update organization data
    const result = await organizationUtil.update(req.params.orgId, updateInstitute);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete organization
organizationService.delete("/:orgId", async (req, res) => {
  try {

    // get org images
    const orgImages = await orgImagesUtils.getImagesByOrg(req.params.orgId);

    for (let image of orgImages) {
      image.name && await deleteFile(image.name); // delete org image from cloud
    }

    // delete images data from db
    await orgImagesUtils.deleteByOrg(req.params.orgId);

    const result = await organizationUtil.delete(req.params.orgId);
    res.status(204).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = organizationService;
