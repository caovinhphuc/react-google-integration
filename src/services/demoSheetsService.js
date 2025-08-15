// Demo Google Sheets Service for Frontend-only deployment
// import googleConfig from "../config/googleConfig";

class DemoGoogleSheetsService {
  constructor() {
    this.mockData = [
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
      ["2024-01-06", "Tablet Samsung", "1", "12000000", "completed", "CUST005"],
      ["2024-01-07", "Phone iPhone", "2", "30000000", "pending", "CUST006"],
    ];
  }

  // Đọc dữ liệu từ Google Sheet (Demo mode)
  async readSheet(sheetName = "Sheet1", range = "A1:Z1000") {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: true,
        values: this.mockData,
        range: `${sheetName}!${range}`,
        mode: "demo",
      };
    } catch (error) {
      console.error("Error reading sheet:", error);
      throw error;
    }
  }

  // Ghi dữ liệu vào Google Sheet (Demo mode)
  async writeSheet(sheetName = "Sheet1", range = "A1", data = []) {
    try {
      console.log("Demo: Writing data to sheet", sheetName, range, data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        success: true,
        updatedCells: data.length,
        updatedRange: `${sheetName}!${range}`,
        mode: "demo",
      };
    } catch (error) {
      console.error("Error writing to sheet:", error);
      throw error;
    }
  }

  // Thêm dữ liệu vào cuối sheet (Demo mode)
  async appendSheet(sheetName = "Sheet1", data = []) {
    try {
      console.log("Demo: Appending data to sheet", sheetName, data);

      // Add to mock data
      this.mockData.push(...data);

      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        success: true,
        updates: {
          updatedRows: data.length,
          updatedCells: data.length * (data[0]?.length || 0),
        },
        mode: "demo",
      };
    } catch (error) {
      console.error("Error appending to sheet:", error);
      throw error;
    }
  }

  // Tạo sheet mới (Demo mode)
  async createSheet(sheetName) {
    try {
      console.log("Demo: Creating new sheet", sheetName);

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: true,
        sheetId: Math.floor(Math.random() * 1000000),
        sheetName: sheetName,
        mode: "demo",
      };
    } catch (error) {
      console.error("Error creating sheet:", error);
      throw error;
    }
  }

  // Lấy thông tin spreadsheet (Demo mode)
  async getSpreadsheetInfo() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      return {
        success: true,
        properties: {
          title: "Demo React Google Integration Spreadsheet",
          spreadsheetId: "demo_spreadsheet_id",
          locale: "vi_VN",
        },
        sheets: [
          {
            properties: {
              sheetId: 0,
              title: "Orders",
              gridProperties: {
                rowCount: 1000,
                columnCount: 26,
              },
            },
          },
          {
            properties: {
              sheetId: 1,
              title: "Reports",
              gridProperties: {
                rowCount: 1000,
                columnCount: 26,
              },
            },
          },
          {
            properties: {
              sheetId: 2,
              title: "Logs",
              gridProperties: {
                rowCount: 1000,
                columnCount: 26,
              },
            },
          },
        ],
        mode: "demo",
      };
    } catch (error) {
      console.error("Error getting spreadsheet info:", error);
      throw error;
    }
  }

  // Test kết nối (Demo mode)
  async testConnection() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      return {
        success: true,
        message: "Demo mode: Google Sheets connection simulated successfully",
        mode: "demo",
      };
    } catch (error) {
      console.error("Error testing connection:", error);
      throw error;
    }
  }

  // Xuất dữ liệu ra CSV
  formatToCSV(data) {
    return data.map((row) => row.join(",")).join("\n");
  }
}

const demoGoogleSheetsService = new DemoGoogleSheetsService();
export default demoGoogleSheetsService;
