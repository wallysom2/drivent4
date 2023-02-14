import { PrismaClient, Booking } from "@prisma/client";

const prisma = new PrismaClient();

type CreateBookingParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;
type UpdateBookingParams = Omit<Booking, "createdAt" | "updatedAt">;

async function createBooking({ roomId, userId }: CreateBookingParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findBookingsByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function upsertBooking({ id, roomId, userId }: UpdateBookingParams) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

const bookingRepository = {
  createBooking,
  findBookingsByRoomId,
  findBookingByUserId,
  upsertBooking,
};

export default bookingRepository;
