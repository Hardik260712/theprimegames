from combatsystem import combat_system_frosthaven
from combatsystem import combat_system_aetheria
from combatsystem import combat_system_drakthar
from combatsystem import combat_system_tanglewood
from combatsystem import combat_system_crimsonheight
from combatsystem import combat_system_whisperingGlen
from combatsystem import combat_system_valiscar
from combatsystem import combat_system_thornhaven
from combatsystem import combat_system_Celestria
from combatsystem import combat_system_Lunaris
from inventory import inventory

list = [0]

def draxon():
    print("If you are ready to start your journey, it's time!")
    print("To go to your next location, you must answer this riddle: The more you take, the more you leave behind, What am I?")
    riddle_answer1 = input("What is your answer?: ")
    if(riddle_answer1 == "Footsteps"):
        pass
    else:
        print("wrong")
    start = input("Where do you want to start your journey (Frosthaven or Aetheria): ")
    if(start == "Frosthaven"):
        print("Ok, you will start at Frosthaven!")
        frosthaven()
    elif(start == "Aetheria"):
        print("Ok, you will start at Aetheria!")
        aetheria()
    else:
        print("try again")


def frosthaven():
    inventory()
    print("Welcome to Frosthaven, the Kingdom of DarkIce! To escape this territory, you must beat the hidden miniboss!")
    combat_system_frosthaven()
    print("Now that you have beaten this miniboss, you can move to the next kingdom!")
    print("To go to your next location, you must answer this riddle: I am not alive, but I can grow. I don't have lungs, but I can drown. What am I?")
    riddle_answer2 = input("What is your answer?: ")
    if(riddle_answer2 == "Fire"):
        pass
    else:
        print("wrong")
    next = input("Where would you like to go next (Crimsonheight or Whispering Glen): ")
    if(next == "Crimsonheight"):
        print("Ok, you are going to the Kingdom of Crimsonheight")
        crimsonheight()
    elif(next == "Whispering Glen"):
        print("Ok, you are goign to the Kingdom of Whispering Glen")
        Whisperingglen()
    else:
        print("try again")


def aetheria():
    inventory()
    print("Welcome to Aetheria, the Kingdom of Wind! To escape this territory, you must beat the hidden miniboss!")
    combat_system_aetheria()
    print("To go to your next location, you must answer this riddle: I'm something, but when you say my name, I disappear. What am I?")
    riddle_answer1 = input("What is your answer?: ")
    if(riddle_answer1 == "Silence"):
        pass
    else:
        print("wrong")
    print("Now that you have beaten this miniboss, you can move to the next kingdom!")
    next_2 = input("Where would you like to go next (Drakthar or TangleWood): ")
    if(next_2 == "Drakthar"):
        print("Ok, you are going to the Kingdom of Drakthar")
        drakthar()
    elif(next_2 == "TangleWood"):
        print("Ok, you are going to the Kingdom of TangleWood")
        tanglewood()
    else:
        print("try again")


def drakthar():
    inventory()
    print("Welcome to Drakthar, the Kingdom of Volcanos! To escape this territory, you must beat the hidden miniboss!")
    combat_system_drakthar()
    print("To go to your next location, you must answer this riddle: What comes once in a minute, twice in a moment, but never in a thousand years?")
    riddle_answer3 = input("What is your answer?: ")
    if(riddle_answer3 == "The letter M"):
        pass
    else:
        print("wrong")
    print("Now that you have beaten this miniboss, you can move to the next kingdom!")
    print("You will now be going to the Kingdom of Valiscar")
    Valiscar()
    pass


def tanglewood():
    inventory()
    print("Welcome to TangleWood, the Kingdom of Vines! To escape this territory, you must beat the hidden miniboss!")
    combat_system_tanglewood()
    print("To go to your next location, you must answer this riddle: The more you have of me, the less you see. What am I?")
    riddle_answer4 = input("What is your answer?: ")
    if(riddle_answer4 == "Darkness"):
        pass
    else:
        print("wrong")
    print("Now that you have beaten this miniboss, you can move to the next kingdom!")
    print("You will now be going to the Kingdom of Valiscar")
    Valiscar()
    pass


def crimsonheight():
    inventory()
    print("Welcome to CrimsonHeight, the Kingdom of Crimson! To escape this territory, you must beat the hidden miniboss!")
    combat_system_crimsonheight()
    print("To go to your next location, you must answer this riddle: I'm always in front of you, but can never be seen. What am I?")
    riddle_answer5 = input("What is your answer?: ")
    if(riddle_answer5 == "The Future"):
        pass
    else:
        print("wrong")
    print("Now that you have beaten this miniboss, you can move to the next kingdom!")
    print("You will now be going to the Kingdom of Thornhaven")
    Thornhaven()
    pass


def Whisperingglen():
    inventory()
    print("Welcome to the Whispering Glen! The kingdom of paranormal ")
    combat_system_whisperingGlen()
    print("Congratulations! You have beat the boss from the kingdom Whispering Glen. Now you are free to travel to the next kingdom.")
    print("To go to your next location, you must answer this riddle: I'm light as a feather, yet the strongest man can't hold me for much longer. What am I?")
    riddle_answer6 = input("What is your answer?: ")
    if(riddle_answer6 == "Breath"):
        pass
    else:
        print("wrong")
    Thornhaven()
    pass


def Thornhaven():
    inventory()
    print("Welcome to Thornhaven! The kingdom of plants")
    combat_system_thornhaven()
    print("Congratulations! You have beaten the boss from the kingdom of Thornhaven. Now you are free to travel to tghe next kingdom")
    print("To go to your next location, you must answer this riddle: I'm always running but I never move. What am I?")
    riddle_answer7 = input("What is your answer?: ")
    if(riddle_answer7 == "A Clock"):
        pass
    else:
        print("wrong")
    Celestria()
    pass


def Celestria():
    inventory()
    print("Welcome to Celestrial! The kingdom of psychics")
    combat_system_Celestria()
    print("Congratulations! You have beat the boss from the kingdom Celestria. Now you are free to travel to the next kingdom.")
    print("To go to your next location, you must answer this riddle: What has to be broken before it can be used?")
    riddle_answer8 = input("What is your answer?: ")
    if(riddle_answer8 == "An Egg"):
        pass
    else:
        print("wrong")
    Lunaris()
    pass


def Valiscar():
    inventory()
    print("Welcome to Valiscar! The kingdom of Knights")
    combat_system_valiscar()
    print("Congratulations! You have beat the boss from the kingdom Valiscar. Now you are free to travel to the next kingdom.")
    print("To go to your next location, you must answer this riddle: What has keys, but can't open a lock?")
    riddle_answer9 = input("What is your answer?: ")
    if(riddle_answer9 == "A Piano"):
        pass
    else:
        print("wrong")
    Celestria()
    pass


def Lunaris():
    inventory()
    print("Welcome to Lunaris! This kingdom is known for its blood bending capabilities.")
    combat_system_Lunaris()
    print("""Congratulations! You have beat the Final Boss from the kingdom Lunaris.
          You have now reacquired all the missing parts of the Shattered Star.You can now return to your kingdom""")
    pass
   

