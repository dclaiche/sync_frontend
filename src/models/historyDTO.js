class HistoryDTO {
    constructor(timestamp, equity, profit_loss, profit_loss_pct, base_value, timeframe) {
      this.timestamp = timestamp;
      this.equity = equity;
      this.profit_loss = profit_loss;
      this.profit_loss_pct = profit_loss_pct;
      this.base_value = base_value;
      this.timeframe = timeframe;
    }

    get_history_object() {
        const instance = {
            timestamp: this.timestamp,
            equity: this.equity,
            profit_loss: this.profit_loss,
            profit_loss_pct: this.profit_loss_pct,
            base_value: this.base_value,
            timeframe: this.timeframe
        };
        return instance;
    }
  
    static fromData(data) {
      const instances = [];
      const { timestamp, equity, profit_loss, profit_loss_pct, base_value, timeframe } = data;
  
      for (let i = 0; i < timestamp.length; i++) {
        instances.push(
          new HistoryDTO(
            timestamp[i],
            equity[i],
            profit_loss[i],
            profit_loss_pct[i],
            base_value,
            timeframe
          )
        );
      }
  
      return instances;
    }
  }

  export default HistoryDTO;