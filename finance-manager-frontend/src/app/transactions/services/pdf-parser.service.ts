// pdf-parser.service.ts
import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

export interface PdfParseResponse {
    date: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category?: string;
  }
  
@Injectable({
  providedIn: 'root'
})



export class PdfParserService {
    
  constructor() { }

  async parsePdf(file: File): Promise<PdfParseResponse[]> {
    // Implement PDF parsing logic here
    // This is a basic example using pdf-parse library
    const pdfjsLib = await import('pdf-parse');
    const pdfjs = pdfjsLib.default;
     // Convert file to ArrayBuffer and then to Buffer
     const dataBuffer = await file.arrayBuffer();
     const buffer = this.arrayBufferToBuffer(dataBuffer);
    
    try {
      const pdfData = await pdfjs(buffer);
      return this.extractTransactions(pdfData.text);
    } catch (error) {
      throw new Error('Failed to parse PDF');
    }
  }

  private arrayBufferToBuffer(ab: ArrayBuffer): Buffer {
    const buffer = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }
    return buffer;
  }


  private extractTransactions(text: string): any[] {
    // Implement your transaction extraction logic
    // This is example regex - adjust according to your PDF format
    const transactionRegex = /(\d{2}-\d{2}-\d{4})\s+(.+?)\s+(-?\d+\.\d{2})/g;
    const matches = [];
    let match;
    
    while ((match = transactionRegex.exec(text)) !== null) {
      matches.push({
        date: match[1],
        description: match[2],
        amount: parseFloat(match[3]),
        type: match[3].startsWith('-') ? 'expense' : 'income'
      });
    }
    
    return matches;
  }
}