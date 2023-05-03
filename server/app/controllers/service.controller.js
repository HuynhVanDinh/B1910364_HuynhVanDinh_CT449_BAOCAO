const ServiceService = require("../services/service.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const path = require("path");
const fs = require("fs");

exports.create = async (req, res, next) => {
  console.log(req.file);
  if (!req.body?.service_name) {
    return next(new ApiError(400, "Service Name can not be empty!"));
  }
  try {
    const serviceService = new ServiceService(MongoDB.client);
    const imagePath = path.join(__dirname, "../../public/images");
    const stringDate = new Date().getTime();
    const filename = stringDate + "_" + req.file.originalname;
    const buffer = fs.readFileSync(req.file.path);
    fs.writeFile(`${imagePath}/${filename}`, buffer, function (err) {
      if (err) {
        return console.error(err);
      }
      console.log("File saved!");
    });
    req.body.image = filename;
    const document = await serviceService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the service!")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const serviceService = new ServiceService(MongoDB.client);
    const { service_name } = req.query;
    if (service_name) {
      documents = await serviceService.findByName(service_name);
    } else {
      documents = await serviceService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occured while retrieving service!")
    );
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const serviceService = new ServiceService(MongoDB.client);
    const document = await serviceService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "service not found!"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving service with id = ${req.params.id} !`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty!"));
  }

  try {
    const serviceService = new ServiceService(MongoDB.client);
    const imagePath = path.join(__dirname, "../../public/images");
    const stringDate = new Date().getTime();
    const filename = stringDate + "_" + req.file.originalname;
    const buffer = fs.readFileSync(req.file.path);
    fs.writeFile(`${imagePath}/${filename}`, buffer, function (err) {
      if (err) {
        return console.error(err);
      }
      console.log("File saved!");
    });
    req.body.image = filename;

    const document = await serviceService.update(req.params.id, req.body);
    console.log("document", document);
    if (!document) {
      return next(new ApiError(404, "service not found!"));
    }
    return res.send({ message: "Service was updated successfully!" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating service with id = ${req.params.id} !`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const serviceService = new ServiceService(MongoDB.client);
    const document = await serviceService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Service not found!"));
    }
    return res.send({ message: "Service was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete service with id = ${req.params.id} !`)
    );
  }
};

exports.deleteAll = async (_req, res, next) => {
  try {
    const serviceService = new ServiceService(MongoDB.client);
    const deletedCount = await serviceService.deleteAll();
    return res.send({
      message: `${deletedCount} services were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while removing all service`)
    );
  }
};

exports.findAllFavorite = async (_req, res, next) => {
  try {
    const serviceService = new ServiceService(MongoDB.client);
    const documents = await serviceService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `An error occured while retrieving favorite services`)
    );
  }
};
