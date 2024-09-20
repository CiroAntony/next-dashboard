"use server";

import { mockQuotes } from "../data/mockQuotes";
import { Quotes } from "../types/quotes";

export async function getQuotes(): Promise<Quotes[]> {
  return mockQuotes;
}

export async function addQuote(newQuote: Quotes): Promise<Quotes> {
  mockQuotes.push(newQuote);
  return newQuote;
}

export async function updateQuote(updatedQuote: Quotes): Promise<Quotes> {
  const index = mockQuotes.findIndex((q) => q.Numero === updatedQuote.Numero);
  if (index !== -1) {
    mockQuotes[index] = updatedQuote;
  }
  return updatedQuote;
}

export async function deleteQuote(numero: number): Promise<void> {
  const index = mockQuotes.findIndex((q) => q.Numero === numero);
  if (index !== -1) {
    mockQuotes.splice(index, 1);
  }
}
