import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";

export async function listarReservas(req: AuthenticatedRequest, res: Response) {
try {
const { userId } = req;
const reserva = await bookingService.getBooking(userId);
return res.status(httpStatus.OK).send({
id: reserva.id,
sala: reserva.Room,
});
} catch (error) {
return res.sendStatus(httpStatus.NOT_FOUND);
}
}

export async function reservarSala(req: AuthenticatedRequest, res: Response) {
try {
const { userId } = req;
const { salaId } = req.body;

if (!salaId) {
  return res.sendStatus(httpStatus.BAD_REQUEST);
}

const reserva = await bookingService.bookingRoomById(userId, Number(salaId));

return res.status(httpStatus.OK).send({
  reservaId: reserva.id,
});

} catch (error) {
    if (error.name === "CannotBookingError") {
    return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
    }
    }
    
    export async function alterarReserva(req: AuthenticatedRequest, res: Response) {
    try {
    const { userId } = req;
    const reservaId = Number(req.params.reservaId);

if (!reservaId) {
  return res.sendStatus(httpStatus.BAD_REQUEST);
}

const { salaId } = req.body;

if (!salaId) {
  return res.sendStatus(httpStatus.BAD_REQUEST);
}

const reserva = await bookingService.changeBookingRoomById(userId, Number(salaId));

return res.status(httpStatus.OK).send({
  reservaId: reserva.id,
});
} catch (error) {
if (error.name === "CannotBookingError") {
return res.sendStatus(httpStatus.FORBIDDEN);
}
return res.sendStatus(httpStatus.NOT_FOUND);
}
}





