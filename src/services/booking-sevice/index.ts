import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking (userId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollment){
        throw notFoundError()
    }
    const booking = await bookingRepository.findUserId (userId)
    if (!booking){
        throw notFoundError()
    }
    return booking
}

async function  bookingRoomById (userId:number, roomId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId (userId)
    if (!enrollment) {
        throw notFoundError()
    }
    const ticket = await ticketRepository.findTicketByEnrollmentId (enrollment.id)

    if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel{
        throw notFoundError()
    })
}