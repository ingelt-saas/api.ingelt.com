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
organizationService.post("/",
  upload.fields([{ name: "images", maxCount: 5 }]),
  async (req, res) => {

    const uploadFileToS3 = (file, filepath) =>
      new Promise((resolve, reject) => {
        awsUpload(file, filepath, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

    try {

      const instituteImages = req.files.images

      const {
        PartnerImages,
        Partnername,
        PartnerPhoneNo,
        PartnerEmail,
        InstituteName,
        InstitutePhone,
        InstituteEmail,
        website,
        overallRating,
        DemoVideoURL,
        prize,
        discountedPrice,
        State,
        Zone,
      } = req.body;
      //   const newInstitute = req.body;
      const newInstitute = {
        name: InstituteName,
        phoneNo: InstitutePhone,
        email: InstituteEmail,
        website,
        overallRating,
        demoVideoUrl: DemoVideoURL,
        fee: prize,
        discountedFee: discountedPrice,
        state: State,
        zone: Zone,
        ownerName: Partnername,
      };

      const newAdmin = {
        name: Partnername,
        phoneNo: PartnerPhoneNo,
        email: PartnerEmail,
      };

      let institute = await organizationUtil.create(newInstitute);
      let result2 = await adminUtil.create(newAdmin);

      //   const logo = req.files.logo[0]; // institute logo
      //   const panPicture = req.files.panPicture ? req.files.panPicture[0] : false; // institute pan picture
      //   const PartnerImages = req.files.PartnerImages; // institute images

      //   const uploadLogo = await uploadFileToS3(logo, "institute"); // upload to aws
      //   newInstitute.logo = uploadLogo.Key; // set key in newInstitute object

      //   if (panPicture) {
      //     const uploadPanPic = await uploadFileToS3(panPicture, "institute"); // upload to aws
      //     newInstitute.panPicture = uploadPanPic.Key; // set key in newInstitute object
      //   }

      if (Array.isArray(instituteImages) && instituteImages.length > 0) {
        let uploadOrgImages = await uploadFileToS3(instituteImages, "institute"); // upload to aws
        uploadOrgImages = uploadOrgImages.map((i) => ({
          name: i.Key,
          organizationId: institute.id,
        }));
        await orgImagesUtils.create(uploadOrgImages); // insert institute images
      }



      // insert new institute





      // create organization admin
      //   await adminUtil.create({
      //     email: newInstitute.adminEmail,
      //     password: newInstitute.adminPassword,
      //     name: newInstitute.ownerName,
      //     organizationId: result.id,
      //   });

      res.status(201).json({ message: "Created" });
    } catch (err) {
      console.log(err);
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
    const result = await organizationUtil.readById(req.params.orgId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update organization
organizationService.put("/:orgId", async (req, res) => {
  try {
    const result = await organizationUtil.update(req.params.orgId, req.body);
    res.status(201).json(result);
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
