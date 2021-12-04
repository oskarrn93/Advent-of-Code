package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func readInputFromFile() []int {
	data, error := os.ReadFile("./input.txt")
	if error != nil {
		panic(error)
	}

	inputDataTrimmedString := strings.Trim(string(data), "\n")
	inputDataStringList := strings.Split(inputDataTrimmedString, "\n")

	input := []int{}

	for _, value := range inputDataStringList {
		input = append(input, convertStringToInt(value))
	}

	return input
}

func convertStringToInt(stingValue string) int {
	value, error := strconv.Atoi(stingValue)

	if error != nil {
		panic(error)
	}

	return value
}

func getSlidingWindowValues(index int, input []int, nrOfValues int) []int {
	result := []int{}

	for i := 0; i < nrOfValues; i++ {
		result = append(result, input[index+i])
	}

	return result
}

func calculateSlidingWindowTotal(input []int) int {
	total := 0
	for _, value := range input {
		total += value
	}

	return total
}

func part1() {
	fmt.Println("Advent of Code day 1 part 1")

	input := readInputFromFile()

	prev := math.MaxInt32
	totalIncreased := 0

	for _, curr := range input {
		if prev < curr {
			totalIncreased++
		}

		prev = curr
	}

	fmt.Println("Answer:", totalIncreased)
}

func part2() {
	fmt.Println("Advent of Code day 1 part 2")

	input := readInputFromFile()

	prevSlidingWindowTotal := math.MaxInt32
	totalIncreased := 0

	maxLength := len(input) - 2 // subtract 2 since we will fetch next two values for a total of three values in the sliding window

	for index := 0; index < maxLength; index += 1 {
		values := getSlidingWindowValues(index, input, 3)

		currentSlidingWindowTotal := calculateSlidingWindowTotal(values)

		if prevSlidingWindowTotal < currentSlidingWindowTotal {
			totalIncreased++
		}

		prevSlidingWindowTotal = currentSlidingWindowTotal
	}

	fmt.Println("Answer:", totalIncreased)
}

func main() {
	part1()
	part2()
}
