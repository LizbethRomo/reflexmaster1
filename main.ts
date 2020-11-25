let select_replay = 0
let end_game_animation: game.LedSprite = null
let round_time_score = 0
let elapsed_time = 0
let answer = false
let question_answered = false
let question_start_time = 0
let icon = 0
let life_time = 0
let lives = 0
let round_start_time_score = 0
let time_score = 0
let streak = 0
let difficulty = 0
let time_factor = 0
let set_difficulty = false
basic.showString("With the compass direction select the game mode")
basic.showString("To start press button A +B ")
basic.showString("A random blinking icon will be assigned to you")
basic.showString("If Happy face appears you press button A")
basic.showString("If Sad face appears you press button B")
basic.showString("if Right arrow appears you tilt the micro bit right")
basic.showString("if Left arrow appears you tilt the micro bit Left")
basic.showString("If Exclamation mark appear you shake micro bit")
basic.showString("if tone sounds you face down the micro bit")
basic.showString("Shake the micro bit, tilt right or left, face down logo, press button A or B")
basic.showString("Perform the instruction under a time of 3 seconds if not you have just two lives remaining and the game is over")
basic.showString("Want to keep on playing?")
let start_icon = 1
music.setTempo(120)
for (let index = 0; index < 3; index++) {
    music.playTone(392, music.beat(BeatFraction.Quarter))
    if (start_icon == 1) {
        basic.showIcon(IconNames.Happy)
        basic.pause(100)
        basic.clearScreen()
    } else if (start_icon == 2) {
        basic.showLeds(`
            . . # . .
            # # # # .
            # # # # #
            # # # # .
            . . # . .
            `)
        basic.pause(100)
        basic.clearScreen()
    } else if (start_icon == 3) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
        basic.pause(100)
        basic.clearScreen()
    }
    start_icon = start_icon + 1
}
music.playTone(587, music.beat(BeatFraction.Whole))
let replay_option = 1
basic.showString("Hello!")
while (replay_option == 1) {
    set_difficulty = false
    basic.showString("Set level")
    basic.showString("A=1")
    basic.showString("Shake=2")
    basic.showString("B=3")
    while (set_difficulty == false) {
        if (input.buttonIsPressed(Button.A) == true) {
            time_factor = 70
            set_difficulty = true
            difficulty = 1
        } else if (input.isGesture(Gesture.Shake)) {
            time_factor = 85
            set_difficulty = true
            difficulty = 2
        } else if (input.buttonIsPressed(Button.B) == true) {
            time_factor = 100
            set_difficulty = true
            difficulty = 3
        }
    }
    basic.showNumber(difficulty)
    basic.pause(500)
    basic.clearScreen()
    streak = 0
    time_score = 0
    for (let index = 0; index < 2; index++) {
        round_start_time_score = input.runningTime()
        lives = 1
        life_time = 2500
        for (let index = 0; index <= 2; index++) {
            basic.showNumber(3 - index)
        }
        basic.clearScreen()
        while (lives > 0) {
            if (life_time > 0) {
                icon = randint(1, 6)
                if (icon == 1) {
                    basic.showLeds(`
                        . . # . .
                        . . # . .
                        . . # . .
                        . . . . .
                        . . # . .
                        `)
                    question_start_time = input.runningTime()
                    question_answered = false
                    while (question_answered == false) {
                        if (input.isGesture(Gesture.Shake)) {
                            answer = true
                            question_answered = true
                            elapsed_time = input.runningTime() - question_start_time
                        } else if (input.runningTime() - question_start_time >= life_time) {
                            answer = false
                            question_answered = true
                        }
                    }
                    basic.clearScreen()
                } else if (icon == 2) {
                    basic.showIcon(IconNames.Happy)
                    question_start_time = input.runningTime()
                    question_answered = false
                    while (question_answered == false) {
                        if (input.buttonIsPressed(Button.A)) {
                            answer = true
                            question_answered = true
                            elapsed_time = input.runningTime() - question_start_time
                        } else if (input.runningTime() - question_start_time >= life_time) {
                            answer = false
                            question_answered = true
                        }
                    }
                    basic.clearScreen()
                } else if (icon == 3) {
                    basic.showIcon(IconNames.Sad)
                    question_start_time = input.runningTime()
                    question_answered = false
                    while (question_answered == false) {
                        if (input.buttonIsPressed(Button.B)) {
                            answer = true
                            question_answered = true
                            elapsed_time = input.runningTime() - question_start_time
                        } else if (input.runningTime() - question_start_time >= life_time) {
                            answer = false
                            question_answered = true
                        }
                    }
                    basic.clearScreen()
                } else if (icon == 4) {
                    basic.showLeds(`
                        . . # . .
                        . . . # .
                        # # # # #
                        . . . # .
                        . . # . .
                        `)
                    question_start_time = input.runningTime()
                    question_answered = false
                    while (question_answered == false) {
                        if (input.isGesture(Gesture.TiltRight)) {
                            answer = true
                            question_answered = true
                            elapsed_time = input.runningTime() - question_start_time
                        } else if (input.runningTime() - question_start_time >= life_time) {
                            answer = false
                            question_answered = true
                        }
                    }
                    basic.clearScreen()
                } else if (icon == 5) {
                    basic.showLeds(`
                        . . # . .
                        . # . . .
                        # # # # #
                        . # . . .
                        . . # . .
                        `)
                    question_start_time = input.runningTime()
                    question_answered = false
                    while (question_answered == false) {
                        if (input.isGesture(Gesture.TiltLeft)) {
                            answer = true
                            question_answered = true
                            elapsed_time = input.runningTime() - question_start_time
                        } else if (input.runningTime() - question_start_time >= life_time) {
                            answer = false
                            question_answered = true
                        }
                    }
                    basic.clearScreen()
                } else if (icon == 6) {
                    music.playMelody("E D G F B A C5 B ", 120)
                    music.playTone(294, music.beat(BeatFraction.Whole))
                    question_start_time = input.runningTime()
                    question_answered = false
                    while (question_answered == false) {
                        if (input.isGesture(Gesture.ScreenDown)) {
                            answer = true
                            question_answered = true
                            elapsed_time = input.runningTime() - question_start_time
                        } else if (input.runningTime() - question_start_time >= life_time) {
                            answer = false
                            question_answered = true
                        }
                    }
                }
                if (answer == true) {
                    streak += 1
                    if (streak <= 15) {
                        music.playTone(587, music.beat(BeatFraction.Whole))
                        life_time = life_time - elapsed_time + (3000 - streak * time_factor)
                    } else {
                        life_time = life_time - elapsed_time + (3000 - 15 * time_factor)
                    }
                } else if (answer == false) {
                    lives += -1
                    basic.showIcon(IconNames.No)
                    basic.pause(10)
                    music.playTone(208, music.beat(BeatFraction.Double))
                    basic.showIcon(IconNames.Heart)
                    basic.pause(10)
                    music.playTone(294, music.beat(BeatFraction.Half))
                    basic.showIcon(IconNames.SmallHeart)
                    basic.pause(10)
                    music.playTone(277, music.beat(BeatFraction.Half))
                    basic.showLeds(`
                        . . . . .
                        . . . . .
                        . . # . .
                        . . . . .
                        . . . . .
                        `)
                    basic.pause(10)
                    music.playTone(262, music.beat(BeatFraction.Half))
                    basic.showLeds(`
                        . # . # .
                        # . . . #
                        . . . . .
                        # . . . #
                        . # . # .
                        `)
                    basic.pause(10)
                    music.playTone(247, music.beat(BeatFraction.Half))
                    basic.clearScreen()
                }
            }
        }
        round_time_score = input.runningTime() - round_start_time_score
        time_score += round_time_score
    }
    end_game_animation = game.createSprite(0, 0)
    for (let index = 0; index < 1; index++) {
        for (let index = 0; index < 3; index++) {
            for (let index = 0; index < 4; index++) {
                end_game_animation.move(1)
                basic.pause(100)
            }
            end_game_animation.turn(Direction.Right, 90)
        }
        for (let index = 0; index < 2; index++) {
            for (let index = 0; index < 3; index++) {
                end_game_animation.move(1)
                basic.pause(100)
            }
            end_game_animation.turn(Direction.Right, 90)
        }
        for (let index = 0; index < 2; index++) {
            for (let index = 0; index < 2; index++) {
                end_game_animation.move(1)
                basic.pause(100)
            }
            end_game_animation.turn(Direction.Right, 90)
        }
        for (let index = 0; index < 2; index++) {
            for (let index = 0; index < 1; index++) {
                end_game_animation.move(1)
                basic.pause(100)
            }
            end_game_animation.turn(Direction.Right, 90)
        }
    }
    end_game_animation.delete()
    basic.showString("Game Over")
    if (streak <= 5) {
        for (let x = 0; x <= streak - 1; x++) {
            led.plot(x, 0)
            basic.pause(100)
        }
    } else if (streak > 5 && streak <= 10) {
        for (let y = 0; y <= 0; y++) {
            for (let x = 0; x <= 4; x++) {
                led.plot(x, y)
                basic.pause(100)
            }
        }
        for (let x = 0; x <= streak - 6; x++) {
            led.plot(x, 1)
            basic.pause(100)
        }
    } else if (streak > 10 && streak <= 15) {
        for (let y = 0; y <= 1; y++) {
            for (let x = 0; x <= 4; x++) {
                led.plot(x, y)
                basic.pause(100)
            }
        }
        for (let x = 0; x <= streak - 11; x++) {
            led.plot(x, 2)
            basic.pause(100)
        }
    } else if (streak > 15 && streak <= 20) {
        for (let y = 0; y <= 2; y++) {
            for (let x = 0; x <= 4; x++) {
                led.plot(x, y)
                basic.pause(100)
            }
        }
        for (let x = 0; x <= streak - 16; x++) {
            led.plot(x, 3)
            basic.pause(100)
        }
    } else if (streak > 20 && streak <= 25) {
        for (let y = 0; y <= 3; y++) {
            for (let x = 0; x <= 4; x++) {
                led.plot(x, y)
                basic.pause(100)
            }
        }
        for (let x = 0; x <= streak - 21; x++) {
            led.plot(x, 4)
            basic.pause(100)
        }
    } else if (streak > 25) {
        for (let y = 0; y <= 4; y++) {
            for (let x = 0; x <= 4; x++) {
                led.plot(x, y)
                basic.pause(100)
            }
        }
        basic.pause(100)
        basic.clearScreen()
        basic.pause(100)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.pause(100)
        basic.clearScreen()
        basic.pause(100)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.pause(100)
        basic.clearScreen()
        basic.pause(100)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    basic.showString("Score=")
    basic.showNumber(streak)
    basic.showString("Time Score=")
    basic.showNumber(time_score)
    if (streak <= 5) {
        music.playTone(233, music.beat(BeatFraction.Double))
        basic.showString("Get better!")
    } else if (streak > 5 && streak <= 10) {
        music.playTone(277, music.beat(BeatFraction.Double))
        basic.showString("Average")
    } else if (streak > 10 && streak <= 15) {
        music.playMelody("C D E F G A B C5 ", 120)
        basic.showString("Nice, good game")
    } else if (streak > 15) {
        music.playMelody("C5 B A G F E D C ", 120)
        basic.showString("Wow! Top Tier")
    }
    basic.showString("Try Again?")
    basic.showString("A or B=YES")
    basic.showString("Shake or tilt=NO")
    basic.showString("?")
    select_replay = 0
    while (select_replay != 1) {
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B) || input.buttonIsPressed(Button.AB)) {
            replay_option = 1
            select_replay = 1
        } else if (input.isGesture(Gesture.TiltLeft) || input.isGesture(Gesture.TiltRight) || input.isGesture(Gesture.Shake)) {
            replay_option = 0
            select_replay = 1
        }
    }
    if (replay_option == 1) {
        basic.showString("Ok, let's go!")
    } else if (replay_option == 0) {
        basic.showString("Thanks for playing :)")
    }
    basic.clearScreen()
}
control.inBackground(function () {
    music.setVolume(127)
    music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.ForeverInBackground)
})
