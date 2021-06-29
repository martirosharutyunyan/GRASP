class RingBuffer {
    constructor(size) {
        this.size = size
        this.buffer = Buffer.alloc(size)
        this.offset = 0
    }

    write(data) {
        const { size, offset } = this
        const { length } = data
        const available = size - offset
        const len = Math.min(available, size, length)
        const rest = available - length
        this.buffer.write(data, offset, len)
        this.offset += len
        if (this.offset === size) this.offset = 0;
        if (rest < 0) this.write(data.slice(rest)) 
    }

    toString() {
        return this.buffer.toString('utf8');
    }
}


const ring = new RingBuffer(10)
ring.write('computer_since')
console.log(ring.toString())