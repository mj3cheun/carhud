import sys, time

# Required to allow electron app to fully initialize before any messages are sent
# Otherwise messages can be lost!
time.sleep(.5)

print('{"hello": "world"}')
sys.stdout.flush()
