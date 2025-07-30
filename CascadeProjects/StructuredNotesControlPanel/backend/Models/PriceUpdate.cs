namespace PricingService.Models
{
    public class PriceUpdate
    {
        public string Isin { get; set; } = string.Empty;
        public decimal BidPrice { get; set; }
        public decimal AskPrice { get; set; }
        public decimal MarkPrice { get; set; }
        public decimal FairPrice { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class TradingNote
    {
        public string Isin { get; set; } = string.Empty;
        public string Group { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public decimal BidPrice { get; set; }
        public decimal AskPrice { get; set; }
        public int BidSpread { get; set; }
        public int AskSpread { get; set; }
        public decimal Position { get; set; }
        public decimal Circle { get; set; }
        public decimal MarkPrice { get; set; }
        public decimal FairPrice { get; set; }
        public string Maturity { get; set; } = string.Empty;
    }
}
