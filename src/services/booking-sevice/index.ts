import { notFoundError as notFound } from "@/errors";
import roomRepository from "@/repositories/room-repository";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import tikectRepository from "@/repositories/ticket-repository";

async function verifyEnrollmentTicket(userId: number) {
const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
if (!enrollment) {
throw notFound();
}
const ticket = await tikectRepository.findTicketByEnrollmentId(enrollment.id);

if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
throw notFound();
}
}

async function verifyValidBooking(roomId: number) {
const room = await roomRepository.findById(roomId);
const bookings = await bookingRepository.findByRoomId(roomId);

if (!room) {
throw notFound();
}
if (room.capacity <= bookings.length) {
throw notFound();
}
}

async function getBookingById(userId: number) {
const booking = await bookingRepository.findByUserId(userId);
if (!booking) {
throw notFound();
}

return booking;
}

async function createBookingById(userId: number, roomId: number) {
await verifyEnrollmentTicket(userId);
await verifyValidBooking(roomId);

return bookingRepository.create({ roomId, userId });
}

async function updateBookingById(userId: number, roomId: number) {
await verifyValidBooking(roomId);
const booking = await bookingRepository.findByUserId(userId);

if (!booking || booking.userId !== userId) {
throw notFound();
}

return bookingRepository.upsertBooking({
id: booking.id,
roomId,
userId
});
}

const bookingService = {
createBookingById,
getBookingById,
updateBookingById,
};

export default bookingService;