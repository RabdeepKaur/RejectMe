// Filecsv.tsx
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "./button";

interface FilecsvProps {
  onParsedData: (data: { name: string; email: string }[]) => void;
}

const Filecsv: React.FC<FilecsvProps> = ({ onParsedData }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = parsedData[0];
      const candidates = parsedData.slice(1).map((row: any) => {
        const entry: Record<string, string> = {};
        headers.forEach((header: string, idx: number) => {
          entry[header.toLowerCase().trim()] = row[idx];
        });
        return {
          name: entry['name'] || entry['candidate name'] || '',
          email: entry['email'] || entry['candidate email'] || '',
        };
      });

      onParsedData(candidates);
    };

    reader.readAsBinaryString(file);
  };
console.log("Filecsv component rendered");
  return (
    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Upload CSV
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFileUpload}
        className="hidden"
      />
    </label>
  );
};

export default Filecsv;
