import art
alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
print("Welcome to this program !")
print(art.logo)
flag = True
while flag == True :
    number = int(input("Choose a number between 0-9 to decrypt the message : "))
    encrypted_message = " znkxk gxk suxk vuyyohrk inkyy mgsky zngt gzusy ot znk uhykxbghrk atobkxyk ! "
    print(encrypted_message)

    output_text = ""
    shift_amount = 6
    if number == 4 :
        for letter in encrypted_message :
            if letter not in alphabet:
                output_text += letter
            else :
                shifted_position = alphabet.index(letter) - shift_amount
                shifted_position %= len(alphabet)
                output_text += alphabet[shifted_position]
        print(f"Good job you got it ! The encrypted message was : {output_text}")
        flag = False
    else :
        print("Sorry try again !")

