import art
print("--------- WELCOME TO YOUR TO-DO LIST ---------")
print(art.logo)
print("\n")
days = ["Monday" , "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
dict_week = {}

#Input of tasks
for day in days :
    cont_1 = 'y'
    dict_week[day] = {}  #nested dictionary
    while cont_1 == 'y' :
        task = input(f"Enter your task for {day} : \n")
        while True:
            priority = input("Enter the task's priority ('HIGH', 'MEDIUM', 'LOW'): ").upper()

            if priority in ["HIGH", "MEDIUM", "LOW"]:
                break
            else:
                print("Invalid priority! Please enter HIGH, MEDIUM, or LOW.\n")

        dict_week[day][task] = priority #adding items to the nested dictionary

        while True:
            cont_1 = input(f"Do you want to add more tasks to {day} ? Type 'y' for YES and 'n' for NO : \n").lower()

            if cont_1 in ["y", "n"]:
                break

            print("Invalid input ! Please enter 'y' or 'n'.")
        if cont_1 == "n":
            break

print("\n"*5)

#Printing of tasks
print(f"\n --------- Your Weekly Tasks ---------  \n ")
for day, tasks in dict_week.items():
    print(f"\n{day}")
    for task, priority in tasks.items():
        print(f"  - {task} ({priority})")

print("\n"*5)

#Printing of tasks by priority
print("\n --------- Tasks Sorted by Priority ---------:\n")

for day in days :
    print(f"\n---- {day} ----\n")
    level_high = []
    level_med = []
    level_low = []
    for task in dict_week[day] :
        priority = dict_week[day][task]
        if priority == 'HIGH' :
            level_high.append(task)
        elif priority == 'MEDIUM' :
            level_med.append(task)
        elif priority == 'LOW':
            level_low.append(task)
        else :
            print("Invalid input!")
    print("HIGH : ")
    if level_high:
        for task in level_high:
            print(f"  - {task}")
    else:
        print("  No tasks")

    print("MEDIUM :")
    if level_med:
        for task in level_med:
            print(f"  - {task}")
    else:
        print("  No tasks")

    print("LOW :")
    if level_low:
        for task in level_low:
            print(f"  - {task}")
    else:
        print("  No tasks")
