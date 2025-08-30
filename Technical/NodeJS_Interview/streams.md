https://dev.to/imsushant12/understanding-nodejs-streams-what-why-and-how-to-use-them-53da

**1.	What are streams in Node.js, and type of streams?**
Ans: streams are a way to handle reading and writing data. Instead of waiting for a whole file to load into memory before you can work with it, streams let you process data in chunks. This makes your application more efficient, especially when dealing with large amounts of data.
There are four main types of streams in Node.js:
•	Readable streams: These are for reading data from a source, like a file. 
        Example: fs.createReadStream() for reading files, http.IncomingMessage (from HTTP requests).
•	Writable streams: These are for writing data to a destination, again, like a file. 
        Example: fs.createWriteStream() for writing to files, http.ServerResponse (for HTTP responses).
•	Duplex streams: These can both read and write data. A good example is a network socket.
        Example: net.Socket (TCP sockets), zlib.Deflate or zlib.Gzip when used in a scenario where you're both reading and writing to the same stream.
•	Transform streams: These are a special type of duplex stream that can modify or transform the data as it passes through. For instance, you could use a transform stream to compress data before writing it to a file. 
        Example: zlib.createGzip() (to compress data), crypto.createCipher() (to encrypt data).

**What is stream piping (.pipe()) and what are its benefits?**
    Piping is a mechanism in Node.js that connects the output of a readable stream directly as the input to a writable stream. The readableStream.pipe(writableStream) method automates the process of reading data chunks from the readable stream and writing them to the writable stream.
        > Automatic Flow Control (Backpressure Handling): The primary benefit is that pipe() automatically manages backpressure. If the writable stream cannot process data as fast as the readable stream provides it, pipe() will temporarily pause the readable stream and resume it when the writable stream is ready, preventing memory exhaustion.
        > Simplicity: It simplifies code by abstracting away manual event handling ('data', 'drain', 'end') and buffer management.
        > Error Propagation: By default, errors from the readable stream are forwarded to the writable stream.
        > Chaining: Multiple streams can be chained together (e.g., source.pipe(transform).pipe(destination)), creating powerful data processing pipelines.

**Explain the concept of backpressure in Node.js streams and how to handle it.** 
    Backpressure occurs when a writable stream cannot process incoming data as fast as the readable stream sends it. This imbalance can lead to the writable stream's internal buffer filling up, potentially consuming excessive memory and causing performance degradation or even application crashes due to memory bloat
    How to Handle Backpressure: 
        > Using .pipe(): The pipe() method is the most straightforward way to handle backpressure, as it automatically implements the necessary flow control by pausing and resuming the readable stream when the writable stream signals it's full (.write() returns false) or empty ('drain' event).
            readableStream.pipe(writableStream); // .pipe() handles backpressure automatically
        > Manual Handling (for custom stream implementations or fine-grained control):
        Check writable.write() return value: The writable.write(chunk) method returns false if the internal buffer is full and true otherwise.
        readable.pause() and readable.resume(): If write() returns false, pause the readable stream using readable.pause().[3][9][14][19]
        Listen for the 'drain' event: When the writable stream's internal buffer is empty and it's ready to accept more data, it emits a 'drain' event. At this point, you should resume the readable stream using readable.resume().
        readableStream.on('data', (chunk) => {
            const canWrite = writableStream.write(chunk);
            if (!canWrite) {
                console.log('Pausing readable stream due to backpressure.');
                readableStream.pause();
            }
        });

        writableStream.on('drain', () => {
            console.log('Resuming readable stream after drain.');
            readableStream.resume();
        }); 

**How do you handle errors in Node.js streams?**
    Error handling is critical in streams to prevent application crashes and ensure resource cleanup. Streams, being instances of EventEmitter, emit an 'error' event when something goes wrong.
    1) Listen for the 'error' event on each stream: Each stream in a pipeline should have an 'error' listener. An unhandled 'error' event will crash the Node.js process.
    `readableStream.on('error', (err) => {
        console.error('Readable Stream Error:', err);
        // Perform cleanup if necessary
    });

    writableStream.on('error', (err) => {
        console.error('Writable Stream Error:', err);
        // Perform cleanup if necessary
    });

    transformStream.on('error', (err) => {
        console.error('Transform Stream Error:', err);
        // Perform cleanup if necessary
    });`

    2) Use stream.pipeline() for robust pipelines: For complex pipelines, the stream.pipeline() utility (available from Node.js v10) is highly recommended. It handles error propagation, cleanup, and ensures proper stream closure, even when errors occur at intermediate stages.
        `const { pipeline } = require('stream');
        const fs = require('fs');
        const zlib = require('zlib');

        pipeline(
            fs.createReadStream('input.txt'),
            zlib.createGzip(),
            fs.createWriteStream('input.txt.gz'),
            (err) => {
                if (err) {
                    console.error('Pipeline failed:', err);
                } else {
                    console.log('Pipeline succeeded');
                }
            }
        );`

    3) Cleanup Resources: Always ensure that resources (like file handles, network connections) are properly closed or released when an error occurs to prevent leaks. The stream.pipeline() function assists with this.[21]

**When would you choose streams over traditional file I/O methods like fs.readFile()?**
    > Streams are generally preferred over traditional I/O methods like fs.readFile() or fs.writeFile() in the following scenarios[1][3]:
    > Large Datasets/Files: When dealing with files or data too large to fit into available memory, streams process data in chunks, avoiding memory exhaustion. fs.readFile() reads the entire file into a buffer before the callback is executed, which can be problematic for large files[1][3][23].
    > Real-time Processing: For applications requiring immediate processing of data as it arrives, such as live video/audio streaming, processing log files as they are written, or real-time data analytics.
    > Efficient Memory Usage: To minimize the application's memory footprint, especially in resource-constrained environments or for high-concurrency servers.
    > Data Transformation: When data needs to be transformed (e.g., compressed, encrypted, parsed) as it flows from source to destination. Streams allow these transformations to be chained efficiently.
    > Network I/O: For HTTP requests and responses, where data is inherently streamed over the network.    
    

