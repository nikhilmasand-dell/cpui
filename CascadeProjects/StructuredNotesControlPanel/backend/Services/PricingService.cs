using Microsoft.AspNetCore.SignalR;
using PricingService.Hubs;
using PricingService.Models;

namespace PricingService.Services
{
    public class PricingService : BackgroundService
    {
        private readonly IHubContext<PriceHub> _hubContext;
        private readonly ILogger<PricingService> _logger;
        private readonly Random _random = new();

        private readonly List<string> _isins = new()
        {
            "XS123456", "XS224567", "XS345678", "XS456789",
            "XS567890", "XS678901", "XS789012"
        };

        public PricingService(IHubContext<PriceHub> hubContext, ILogger<PricingService> logger)
        {
            _hubContext = hubContext;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Pricing Service started");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var priceUpdates = GeneratePriceUpdates();
                    await BroadcastPriceUpdates(priceUpdates);
                    
                    // Wait 2-5 seconds before next update
                    var delay = _random.Next(2000, 5000);
                    await Task.Delay(delay, stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in pricing service");
                    await Task.Delay(5000, stoppingToken);
                }
            }
        }

        private List<PriceUpdate> GeneratePriceUpdates()
        {
            var updates = new List<PriceUpdate>();
            
            // Generate updates for 1-3 random ISINs each time
            var updateCount = _random.Next(1, 4);
            var selectedIsins = _isins.OrderBy(x => _random.Next()).Take(updateCount);

            foreach (var isin in selectedIsins)
            {
                var basePrice = 95 + _random.NextDouble() * 10; // Base price between 95-105
                var spread = 0.1 + _random.NextDouble() * 0.5; // Spread between 0.1-0.6

                var update = new PriceUpdate
                {
                    Isin = isin,
                    BidPrice = (decimal)(basePrice - spread / 2),
                    AskPrice = (decimal)(basePrice + spread / 2),
                    MarkPrice = (decimal)(basePrice + (_random.NextDouble() - 0.5) * 0.2),
                    FairPrice = (decimal)(basePrice + (_random.NextDouble() - 0.5) * 0.3),
                    Timestamp = DateTime.UtcNow
                };

                updates.Add(update);
            }

            return updates;
        }

        private async Task BroadcastPriceUpdates(List<PriceUpdate> updates)
        {
            try
            {
                if (updates.Any())
                {
                    await _hubContext.Clients.All.SendAsync("BulkPriceUpdate", updates);
                    _logger.LogInformation($"Broadcasted {updates.Count} price updates");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error broadcasting price updates");
            }
        }
    }
}
