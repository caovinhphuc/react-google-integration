import googleConfig from "../config/googleConfig";

class GoogleSheetsService {
  constructor() {
    this.baseUrl = googleConfig.api_base_url;
  }

  // Đọc dữ liệu từ Google Sheet
  async readSheet(sheetName = "Sheet1", range = "A1:Z1000") {
    try {
      // Direct Google Sheets API call
      const apiKey = googleConfig.client_email ? "demo_mode" : null;
      if (!apiKey) {
        throw new Error("Google Sheets API not configured");
      }

      // Mock data for demo purposes on static hosting
      const mockData = [
        ["date", "product", "quantity", "total", "status", "customer_id"],
        ["2024-01-01", "Laptop Dell", "1", "15000000", "completed", "CUST001"],
        ["2024-01-02", "Mouse Logitech", "2", "500000", "completed", "CUST002"],
        [
          "2024-01-03",
          "Keyboard Mechanical",
          "1",
          "2000000",
          "pending",
          "CUST003",
        ],
        ["2024-01-04", "Monitor 4K", "1", "8000000", "completed", "CUST001"],
        ["2024-01-05", "Webcam HD", "3", "1500000", "completed", "CUST004"],
      ];

      const response = {
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            values: mockData,
            range: `${sheetName}!${range}`,
          }),
      };

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error reading sheet:", error);
      throw error;
    }
  }

  // Ghi dữ liệu vào Google Sheet
  async writeSheet(sheetName = "Sheet1", range = "A1", values = []) {
    try {
      const response = await fetch(`${this.baseUrl}/sheets/write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spreadsheetId: googleConfig.spreadsheet_id,
          range: `${sheetName}!${range}`,
          values: values,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error writing sheet:", error);
      throw error;
    }
  }

  // Thêm dữ liệu vào cuối sheet
  async appendSheet(sheetName = "Sheet1", values = []) {
    try {
      const response = await fetch(`${this.baseUrl}/sheets/append`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spreadsheetId: googleConfig.spreadsheet_id,
          range: `${sheetName}!A1`,
          values: values,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error appending sheet:", error);
      throw error;
    }
  }

  // Tạo sheet mới
  async createSheet(sheetName) {
    try {
      const response = await fetch(`${this.baseUrl}/sheets/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spreadsheetId: googleConfig.spreadsheet_id,
          sheetName: sheetName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating sheet:", error);
      throw error;
    }
  }

  // Lấy thông tin về spreadsheet
  async getSpreadsheetInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/sheets/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spreadsheetId: googleConfig.spreadsheet_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting spreadsheet info:", error);
      throw error;
    }
  }

  // Parse CSV data thành array
  parseCSVData(csvText) {
    const lines = csvText.split("\n");
    return lines.map((line) => line.split(",").map((cell) => cell.trim()));
  }

  // Format data thành CSV
  formatToCSV(data) {
    return data.map((row) => row.join(",")).join("\n");
  }
}

const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
