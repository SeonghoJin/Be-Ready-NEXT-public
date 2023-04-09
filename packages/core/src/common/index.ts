import express from "express";
import { CompanyRepository, TagRepository, TimeDatabase } from "@./repository";
import { CommonService } from "./common.service";

type GetCommonRouterArgs = {
  timeRepository: TimeDatabase;
  companyRepository: CompanyRepository;
  tagRepository: TagRepository;
};

export const getCommonRouter = ({
  timeRepository,
  companyRepository,
  tagRepository
}: GetCommonRouterArgs) => {
  const commonService = new CommonService(timeRepository, companyRepository, tagRepository);
  const commonRouter = express.Router();

  commonRouter.get("/:path", async (req, res) => {
    const { path } = req.params;

    if (typeof path !== "string") {
      throw new TypeError();
    }

    const batchTime = await commonService.getTime(path);

    res.send(batchTime ?? {});
  });

  commonRouter.get("/company/all", async (req, res) => {
    res.send({ companyList: await commonService.getCompanyAll() });
  });

  commonRouter.get('/tag/all', async (req, res) => {
    res.send({ tagList: await commonService.getTagAll() });
  })


  return commonRouter;
};
