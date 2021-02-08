class QueueBuffer { constructor(queuelimit) {
        this.queueMaxLength = queuelimit;
        this.queue = [];
    }

    enqueue(data) {
        if (this.queue.length < this.queueMaxLength) {
            this.queue.push(data);
        } else {
            console.log("Queue is full, unsubscribing")
        }
    }

    dequeue() {
        return this.queue.shift();
    }
}

module.exports = QueueBuffer;