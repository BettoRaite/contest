import type { Request, Response } from 'express';
import db from '@/db';
import { workShifts } from 'drizzle/schema';
import { StatusCodes } from 'http-status-codes';
import type { TypedRequest } from '@/types/types';
import { eq } from 'drizzle-orm';

export const handleCreateShift = async (req: Request, res: Response) => {
  const newShift = req.body;
  const [shift] = await db.insert(workShifts).values(newShift).$returningId();
  const { id } = shift as {
    id: number;
  };
  res.status(StatusCodes.CREATED).json({
    id,
    ...newShift
  });
};

export const handleOpenShift = async (req: TypedRequest, res: Response) => {
  const { id } = req.params as { id: number };
  const result = await db
    .select()
    .from(workShifts)
    .where(eq(workShifts.active, true));
  const hasActiveShift = result[0];
  if (hasActiveShift) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Shift with given id does not exist'
    });
  }
  await db
    .update(workShifts)
    .set({
      active: true
    })
    .where(eq(workShifts.id, id));
  const shifts = await db
    .select()
    .from(workShifts)
    .where(eq(workShifts.id, id));
  const shift = shifts[0];
  res.status(StatusCodes.CREATED).json({
    ...shift
  });
};

export const handleCloseShift = async (req: TypedRequest, res: Response) => {
  const { id } = req.params as { id: number };
  const result = await db
    .select()
    .from(workShifts)
    .where(eq(workShifts.active, true));
  const hasActiveShift = result[0];
  if (hasActiveShift) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Shift with given id does not exist'
    });
  }
  await db
    .update(workShifts)
    .set({
      active: true
    })
    .where(eq(workShifts.id, id));
  const shifts = await db
    .select()
    .from(workShifts)
    .where(eq(workShifts.id, id));
  const shift = shifts[0];
  res.status(StatusCodes.CREATED).json({
    ...shift
  });
};
