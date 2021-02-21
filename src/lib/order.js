class OrderModule {
    constructor() {
        this.orderId = "";
    }

    setOrderId(value) {
        this.orderId = value;
    }

    getOrderId() {
        return this.orderId;
    }
}

module.exports = OrderModule;
