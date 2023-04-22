"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "mockTestMarks",
      [
        {
          mockTestId: "MT001",
          studentId: "USER001",
          id: "MTM01",
          listeningBands: 7.5,
          readingBands: 7.5,
          writingBands: 7.5,
          speakingBands: 6.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mockTestId: "MT001",
          studentId: "USER002",
          id: "MTM02",
          listeningBands: 8.0,
          readingBands: 8.0,
          writingBands: 8.0,
          speakingBands: 8.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mockTestId: "MT001",
          studentId: "USER003",
          id: "MTM03",
          listeningBands: 7.0,
          readingBands: 6.5,
          writingBands: 7.0,
          speakingBands: 7.5,
          createdAt: new Date(),
          updatedAt: new Date(),
          },
          {
            mockTestId: "MT001",
            studentId: "USER006",
            id: "MTM08",
            listeningBands: 6.5,
            readingBands: 6.5,
            writingBands: 7.0,
            speakingBands: 7.5,
            createdAt: new Date(),
            updatedAt: new Date(),
            },
            {
              mockTestId: "MT001",
              studentId: "USER007",
              id: "MTM09",
              listeningBands: 7.5,
              readingBands: 8.0,
              writingBands: 7.5,
              speakingBands: 7.0,
              createdAt: new Date(),
              updatedAt: new Date(),
              },
              {
                mockTestId: "MT001",
                studentId: "USER008",
                id: "MTM10",
                listeningBands: 7.0,
                readingBands: 6.5,
                writingBands: 6.5,
                speakingBands: 7.0,
                createdAt: new Date(),
                updatedAt: new Date(),
                },
                {
                  mockTestId: "MT001",
                  studentId: "USER009",
                  id: "MTM14",
                  listeningBands: 6.0,
                  readingBands: 6.5,
                  writingBands: 7.0,
                  speakingBands: 6.0,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  },
                  {
                    mockTestId: "MT001",
                    studentId: "USER011",
                    id: "MTM15",
                    listeningBands: 7.5,
                    readingBands: 7.0,
                    writingBands: 7.0,
                    speakingBands: 7.0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    },
                    {
                      mockTestId: "MT001",
                      studentId: "USER012",
                      id: "MTM16",
                      listeningBands: 7.0,
                      readingBands: 6.5,
                      writingBands: 6.5,
                      speakingBands: 7.5,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      },
                      {
                        mockTestId: "MT001",
                        studentId: "USER021",
                        id: "MTM17",
                        listeningBands: 7.0,
                        readingBands: 7.0,
                        writingBands: 7.0,
                        speakingBands: 7.0,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        },
                        {
                          mockTestId: "MT001",
                          studentId: "USER022",
                          id: "MTM18",
                          listeningBands: 7.0,
                          readingBands: 7.0,
                          writingBands: 7.0,
                          speakingBands: 7.0,
                          createdAt: new Date(),
                          updatedAt: new Date(),
                        },
                        {
                          mockTestId: "MT001",
                          studentId: "USER023",
                          id: "MTM19",
                          listeningBands: 7.0,
                          readingBands: 7.0,
                          writingBands: 7.0,
                          speakingBands: 7.0,
                          createdAt: new Date(),
                          updatedAt: new Date(),
                        }
      ],
      {}
    );
  }90p,

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
