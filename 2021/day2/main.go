package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Command struct {
	direction string
	unit      int
}

type Position struct {
	horizontal int
	depth      int
	aim        int
}

func convertStringToInt(stingValue string) int {
	value, error := strconv.Atoi(stingValue)

	if error != nil {
		panic(error)
	}

	return value
}

func parseCommand(input string) Command {
	result := strings.Split(input, " ")

	direction := result[0]
	unit := convertStringToInt(result[1])

	return Command{direction: direction, unit: unit}
}

func readInputFromFile() []Command {
	data, error := os.ReadFile("./input.txt")
	if error != nil {
		panic(error)
	}

	inputDataTrimmedString := strings.Trim(string(data), "\n")
	inputDataStringList := strings.Split(inputDataTrimmedString, "\n")

	input := []Command{}

	for _, value := range inputDataStringList {
		input = append(input, parseCommand(value))
	}

	return input
}

func updatePosition(command Command, position *Position) {
	if command.direction == "forward" {
		position.horizontal += command.unit
	} else if command.direction == "up" {
		position.depth -= command.unit
	} else if command.direction == "down" {
		position.depth += command.unit
	} else {
		panic("unknown direction")
	}
}

func updatePositionWithAim(command Command, position *Position) {
	if command.direction == "forward" {
		position.horizontal += command.unit
		position.depth += position.aim * command.unit
	} else if command.direction == "up" {
		position.aim -= command.unit
	} else if command.direction == "down" {
		position.aim += command.unit
	} else {
		panic("unknown direction")
	}
}
func part1() {
	fmt.Println("Advent of Code day 2 part 1")

	input := readInputFromFile()

	position := Position{
		horizontal: 0,
		depth:      0,
	}

	for _, command := range input {
		updatePosition(command, &position)
	}

	result := position.horizontal * position.depth
	fmt.Println("Answer:", result)
}

func part2() {
	fmt.Println("Advent of Code day 2 part 2")

	input := readInputFromFile()

	position := Position{
		horizontal: 0,
		depth:      0,
		aim:        0,
	}

	for _, command := range input {
		updatePositionWithAim(command, &position)
	}

	result := position.horizontal * position.depth
	fmt.Println("Answer:", result)
}

func main() {
	part1()
	part2()
}
