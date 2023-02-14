
import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { reservarSala, listarReservas, alterarReserva } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listarReservas)
  .post("", reservarSala)
  .put("/:bookingId", alterarReserva);

export { bookingRouter };