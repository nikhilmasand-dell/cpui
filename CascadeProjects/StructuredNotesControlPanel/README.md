# Structured Notes Control Panel

A professional trading application built with Angular and C# ASP.NET Core, featuring real-time price streaming via SignalR.

## Features

- **Real-time Price Streaming**: Live price updates for structured notes via SignalR
- **Professional Trading UI**: Clean, modern interface designed for traders
- **Three Main Tabs**: Notes (main grid), BOR Errors, Price History
- **Interactive Grid**: Right-click context menu with trading actions
- **Responsive Design**: Works across different screen sizes and devices

## Technology Stack

### Frontend
- Angular 16
- TypeScript
- Bootstrap for styling
- Microsoft SignalR client

### Backend
- C# ASP.NET Core 6.0
- SignalR for real-time communication
- Background hosted services for price generation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- .NET 6.0 SDK
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikhilmasand-dell/cpui.git
   cd cpui
   ```

2. **Setup Backend**
   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```
   Backend will run on `http://localhost:5000`

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ng serve
   ```
   Frontend will run on `http://localhost:4200`

## Architecture

The application uses a real-time architecture where:
- C# backend generates mock trading data continuously
- SignalR hub broadcasts price updates to all connected clients
- Angular frontend receives updates and displays them in real-time grid
- CORS is configured to support local development and dev tunnels

## Development

### Running in Development
1. Start the backend: `dotnet run` in `/backend`
2. Start the frontend: `ng serve` in `/frontend`
3. Navigate to `http://localhost:4200`

### VS Code Dev Tunnels
The application supports VS Code dev tunnels for remote access and testing.

## License

This project is licensed under the MIT License.
