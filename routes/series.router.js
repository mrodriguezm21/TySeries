const express = require("express");
const router = express.Router();
const response = require("./response");
const seriesService = require("../services/series.services");

router.get("/", async (req, res) => {
  const filterByTitle = req.query.title || null;
  try {
    const series = await seriesService.list(filterByTitle);
    response.success(req, res, series, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const serie = await seriesService.listOne(id);
    response.success(req, res, serie, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/categories/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const series = await seriesService.listByCategory(category);
    response.success(req, res, series, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const serie = await seriesService.create(req.body);
    response.success(req, res, serie, 201);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const serie = await seriesService.update(id, req.body);
    response.success(req, res, serie, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
