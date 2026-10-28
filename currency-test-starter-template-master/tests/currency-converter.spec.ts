import { Request, Response } from "express";
import { calculateConversion } from "../utils/convert";

export const convertAmount = async (req: Request, res: Response) => {
  try {
    const { from, to, amount } = req.body;

    const fromCode = typeof from === "string" ? from.trim().toUpperCase() : "";
    const toCode = typeof to === "string" ? to.trim().toUpperCase() : "";
    const currencyCodePattern = /^[A-Z]{3}$/;

    if (!fromCode || !toCode) {
      res.status(400).json({
        error: 'Body parameters "from" and "to" are required.',
      });
    } else if (
      !currencyCodePattern.test(fromCode) ||
      !currencyCodePattern.test(toCode)
    ) {
      res.status(400).json({
        error:
