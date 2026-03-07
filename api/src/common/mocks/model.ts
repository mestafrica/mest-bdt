export const mockModel = {
  insertOne: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  updateOne: jest.fn().mockReturnThis(),
  countDocuments: jest.fn().mockReturnThis(),
  deleteOne: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  sort: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
};
