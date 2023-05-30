const express = require("express");
const studentUtil = require("../../utils/student");
const mockTestMarksUtil = require("../../utils/mockTestMarks");
const { memoryStorage } = require("multer");
const multer = require("multer");
const studentService = express.Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require("../../aws/upload");
const deleteFile = require("../../aws/delete");
const organisationUtil = require("../../utils/organization");
const { errorMonitor } = require("nodemailer/lib/xoauth2");

// POST new student
studentService.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const newStudent = req.body;
    newStudent.organizationId = req.decoded.organizationId;
    newStudent.type = "walk-in";
    newStudent.active = true;

    // check student by email
    const getStudent = await studentUtil.readByEmail(req.body.email);

    // student image uploading promise func
    const studentImageUpload = () =>
      new Promise((resolve, reject) => {
        awsUpload(file, "student/profile", async (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

    if (getStudent) {
      // if has user at this email then return here
      return res.status(208).send({ message: "student exists at this email" });
    } else {
      if (file) {
        const uploadedImage = await studentImageUpload();
        newStudent.image = uploadedImage.Key;
      }

      const result = await studentUtil.create(newStudent);

      // if student is ingelt then update ingelt revenue
      if (newStudent.type === "walk-in") {
        // update ingelt revenue

        const ress = await organisationUtil.ingeltRevenueUpdate(
          newStudent.organizationId
        );
        console.log("walk-in");
      } else {
        // update walk-in revenue
        const ress = await organisationUtil.walkInRevenueUpdate(
          newStudent.organizationId
        );
      }
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// get active students
studentService.get("/activeStudents", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const { s, pageNo, limit } = req.query;
    const result = await studentUtil.activeStudents(
      orgId,
      parseInt(pageNo),
      parseInt(limit),
      s
    );
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// fresh students
studentService.get("/freshStudents", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const { s, pageNo, limit } = req.query;
    const result = await studentUtil.freshStudents(
      orgId,
      parseInt(pageNo),
      parseInt(limit),
      s
    );
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// passed students
studentService.get("/passedStudents", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const { s, pageNo, limit } = req.query;
    const result = await studentUtil.passedStudents(
      orgId,
      parseInt(pageNo),
      parseInt(limit),
      s
    );
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// search student in the organization
studentService.get("/search", async (req, res) => {
  try {
    const { s, pageno, limit } = req.query;
    const orgId = req.decoded.organizationId;
    const result = await studentUtil.searchStuByOrg(
      orgId,
      s,
      parseInt(pageno),
      parseInt(limit)
    );
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all student in the organization
studentService.get("/getall", async (req, res) => {
  try {
    const { pageno, limit } = req.query;
    const orgId = req.decoded.organizationId;
    const result = await studentUtil.allStuByOrgId(
      orgId,
      parseInt(pageno),
      parseInt(limit)
    );
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// search student in the all student
studentService.get("/searchAll", async (req, res) => {
  try {
    const { s } = req.query;
    const orgId = req.decoded.organizationId;
    const result = await studentUtil.searchFreshStudentsByOrg(orgId, s);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all student in the batch
studentService.get("/batch/:batchId", async (req, res) => {
  try {
    const { pageno, limit } = req.query;
    const batchId = req.params.batchId;
    const result = await studentUtil.readByBatch(
      batchId,
      parseInt(pageno),
      parseInt(limit)
    );
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get a student by student id
studentService.get("/:studentId", async (req, res) => {
  try {
    const result = await studentUtil.readById(req.params.studentId);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get student average band
studentService.get("/avgBand/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const result = await studentUtil.bandScore(studentId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get student mock test marks
studentService.get("/mockTestMarks/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const result = await mockTestMarksUtil.getMockTestMarksByStudent(studentId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update student
studentService.put("/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  const updateData = req.body;
  try {
    const result = await studentUtil.update(studentId, updateData);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update student profile image
studentService.put(
  "/updatePicture/:studentId",
  upload.single("image"),
  async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const file = req.file;

      const student = studentUtil.readById(studentId);

      awsUpload(file, "student/profile", async (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          // delete file from aws
          student?.image && (await deleteFile(student.image));

          await studentUtil.update(studentId, { image: data.key }); // update image in db
          res.json({ image: data.key });
        }
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// delete student
studentService.delete("/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const result = await studentUtil.delete(studentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = studentService;
