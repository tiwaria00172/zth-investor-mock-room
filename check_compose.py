with open(r'investor-mock-room\frontend\src\App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('className="compose"')
print(text[pos:pos+1000])
