// Mock API Service for static hosting without backend
export const mockApiService = {
  // Mock health check
  health: () => Promise.resolve({
    status: 'OK',
    timestamp: new Date().toISOString(),
    services: {
      sheets: true,
      email: true,
      telegram: true,
    },
    mode: 'demo'
  }),

  // Mock sheets API
  sheets: {
    read: () => Promise.resolve({
      success: true,
      values: [
        ['date', 'product', 'quantity', 'total', 'status', 'customer_id'],
        ['2024-01-01', 'Laptop Dell', '1', '15000000', 'completed', 'CUST001'],
        ['2024-01-02', 'Mouse Logitech', '2', '500000', 'completed', 'CUST002'],
        ['2024-01-03', 'Keyboard Mechanical', '1', '2000000', 'pending', 'CUST003'],
        ['2024-01-04', 'Monitor 4K', '1', '8000000', 'completed', 'CUST001'],
        ['2024-01-05', 'Webcam HD', '3', '1500000', 'completed', 'CUST004'],
      ],
      range: 'Orders!A1:Z100',
      mode: 'demo'
    }),
    
    info: () => Promise.resolve({
      success: true,
      properties: {
        title: "Demo React Google Integration Spreadsheet",
        spreadsheetId: "demo_spreadsheet_id"
      },
      sheets: [
        { properties: { sheetId: 0, title: "Orders" }},
        { properties: { sheetId: 1, title: "Reports" }},
        { properties: { sheetId: 2, title: "Logs" }}
      ],
      mode: 'demo'
    }),
    
    create: () => Promise.resolve({
      success: true,
      sheetId: Math.floor(Math.random() * 1000000),
      sheetName: "New Sheet",
      mode: 'demo'
    }),
    
    write: () => Promise.resolve({
      success: true,
      updatedCells: 5,
      updatedRange: "A1:E1",
      mode: 'demo'
    })
  },

  // Mock reports API
  reports: {
    overview: () => Promise.resolve({
      success: true,
      report: {
        timestamp: new Date().toISOString(),
        systemStatus: {
          sheets: true,
          drive: true,
          email: true,
          telegram: true,
        },
        alertHistory: 12,
        uptime: 3600,
        mode: 'demo'
      }
    })
  },

  // Mock alerts API
  alerts: {
    testEmail: () => Promise.resolve({
      success: true,
      message: 'Demo: Email connection test successful',
      mode: 'demo'
    }),
    
    testTelegram: () => Promise.resolve({
      success: true,
      message: 'Demo: Telegram connection test successful',
      mode: 'demo'
    }),
    
    history: () => Promise.resolve({
      success: true,
      alerts: [
        {
          type: 'EMAIL',
          subject: 'Demo Alert',
          message: 'This is a demo alert',
          timestamp: new Date().toISOString()
        }
      ],
      mode: 'demo'
    })
  }
};

// Intercept fetch calls to localhost:3001 and return mock data
const originalFetch = window.fetch;
window.fetch = async (url, options) => {
  // Check if it's a call to our backend API
  if (url.includes('localhost:3001/api/')) {
    console.log('🔄 Intercepting API call:', url);
    
    const apiPath = url.split('/api/')[1];
    const delay = 300 + Math.random() * 200; // Random delay 300-500ms
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    switch (apiPath) {
      case 'health':
        return {
          ok: true,
          json: () => Promise.resolve(mockApiService.health())
        };
      
      case 'sheets/read':
        return {
          ok: true,
          json: () => Promise.resolve(mockApiService.sheets.read())
        };
      
      case 'sheets/info':
        return {
          ok: true,
          json: () => Promise.resolve(mockApiService.sheets.info())
        };
      
      case 'sheets/create':
        return {
          ok: true,
          json: () => Promise.resolve(mockApiService.sheets.create())
        };
      
      case 'sheets/write':
      case 'sheets/append':
        return {
          ok: true,
          json: () => Promise.resolve(mockApiService.sheets.write())
        };
      
      case 'reports/overview':
        return {
          ok: true,
          json: () => Promise.resolve(mockApiService.reports.overview())
        };
      
      case 'alerts/test-email':
        return {
          ok: true,
          json: () => Promise.resolve(mockApiService.alerts.testEmail())
        };
      
      case 'alerts/test-telegram':
        return {
          ok: true,
          json: () => Promise.resolve(mockApiService.alerts.testTelegram())
        };
      
      case 'alerts/history':
        return {
          ok: true,
          json: () => Promise.resolve(mockApiService.alerts.history())
        };
      
      default:
        return {
          ok: true,
          json: () => Promise.resolve({ 
            success: true, 
            message: 'Demo API response',
            mode: 'demo' 
          })
        };
    }
  }
  
  // For all other URLs, use original fetch
  return originalFetch(url, options);
};

console.log('🎭 Mock API Service loaded - intercepting localhost:3001 calls');
