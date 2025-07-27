/* Filecsv.tsx
import React from "react";
import * as XLSX from "xlsx";


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
*/
// Filecsv.tsx
import React from "react";
import * as XLSX from "xlsx";

interface FilecsvProps {
  onParsedData: (data: { name: string; email: string }[]) => void;
}

const Filecsv: React.FC<FilecsvProps> = ({ onParsedData }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // Method 1: Array of arrays (your current method)
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log("Raw parsed data (array method):", parsedData);

        // Method 2: Object method (alternative)
        const objectData = XLSX.utils.sheet_to_json(sheet);
        console.log("Raw parsed data (object method):", objectData);

        let candidates: { name: string; email: string }[] = [];

        if (objectData.length > 0) {
          // Use object method if available
          candidates = objectData.map((row, index: number) => {
            const r = row as Record<string, unknown>;
            console.log(`Processing object row ${index + 1}:`, r);
            
            const candidate = {
              name: String(
                r['Name'] ||
                r['Candidate Name'] ||
                r['Full Name'] ||
                r['name'] ||
                r['candidate name'] ||
                r['full name'] ||
                ''
              ),
              email: String(
                r['Email'] ||
                r['Candidate Email'] ||
                r['Email Address'] ||
                r['email'] ||
                r['candidate email'] ||
                r['email address'] ||
                ''
              ),
            };

            console.log(`Candidate ${index + 1}:`, candidate);
            return candidate;
          });
        } else if (parsedData.length >= 2) {
          // Fallback to array method
          console.log("Total rows found:", parsedData.length);
          const headers = parsedData[0] as string[];
          console.log("Headers found:", headers);

          candidates = parsedData.slice(1).map((row, index: number) => {
            const arr = row as string[];
            console.log(`Processing array row ${index + 1}:`, arr);
            
            const entry: Record<string, string> = {};
            headers.forEach((header: string, idx: number) => {
              if (header) {
                entry[header.toLowerCase().trim()] = arr[idx] || '';
              }
            });

            console.log(`Entry ${index + 1}:`, entry);

            const candidate = {
              name: entry['name'] || entry['candidate name'] || entry['full name'] || '',
              email: entry['email'] || entry['candidate email'] || entry['email address'] || '',
            };

            console.log(`Candidate ${index + 1}:`, candidate);
            return candidate;
          });
        }

        console.log("Final candidates array:", candidates);
        console.log("Total candidates processed:", candidates.length);

        // Filter out completely empty candidates
        const validCandidates = candidates.filter(candidate => 
          candidate.name.trim() !== '' || candidate.email.trim() !== ''
        );

        console.log("Valid candidates after filtering:", validCandidates);
        onParsedData(validCandidates);

      } catch (error) {
        console.error("Error processing file:", error);
        onParsedData([]);
      }
    };

    reader.onerror = (error) => {
      console.error("File reading error:", error);
      onParsedData([]);
    };

    reader.readAsBinaryString(file);
  };

  console.log("Filecsv component rendered");
  
  return (
    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#7c3bed] text-white rounded hover:bg-blue-700 transition">
      Upload CSV/Excel
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