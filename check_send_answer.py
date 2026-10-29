with open(r'investor-mock-room\frontend\src\App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('const sendAnswer = async () => {')
if pos == -1:
    pos = text.find('sendAnswer')
print(text[pos:pos+800])
