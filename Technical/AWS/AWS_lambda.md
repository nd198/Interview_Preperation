<!-- https://www.youtube.com/watch?v=MUrcjIqpz6o&list=PLxoOrmZMsAWyBy3qwWdNhtAi-J4yLK1k9&index=20 -->
Links:-
https://www.youtube.com/watch?v=GkKNxyLp_V0&list=PLdpzxOOAlwvLNOxX0RfndiYSt1Le9azze&ab_channel=Abhishek.Veeramalla

https://www.youtube.com/watch?v=N4sJj-SxX00&ab_channel=MPrashant

what is AWS lambda
    > Lambda is an event driven service, meaning it runs your code in response to certain triggers or event.
    > these events can come from many different servoces like 
        1) S3
        2) DynamoDB
        3) API gatway
        4) Cloud watch(Scheduled Event)
        5) SNS, SQS

what are the use cases
what is handler function

export.myHandler = function(event, context, callback){
    <!-- event --> // if we are using api gatway so api related data will present in event
    callback()
}