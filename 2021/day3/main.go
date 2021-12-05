package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

var BINARY_STRING_INPUT_LENGTH int = 12

func readInputFromFile() []string {
	data, error := os.ReadFile("./input.txt")
	if error != nil {
		panic(error)
	}

	inputDataTrimmedString := strings.Trim(string(data), "\n")
	input := strings.Split(inputDataTrimmedString, "\n")

	return input
}

func convertStringToInt(stingValue string) int {
	value, error := strconv.Atoi(stingValue)

	if error != nil {
		panic(error)
	}

	return value
}

func convertBinaryStringToInt(stingValue string) int64 {
	value, error := strconv.ParseInt(stingValue, 2, 32)

	if error != nil {
		panic(error)
	}

	return value
}

func calculateFrequencyPerPosition(input []string, frequency *map[int]int) {
	for _, str := range input {

		for position, char := range str {
			if char == rune('1') {
				(*frequency)[position] += 1
			} else if char == rune('0') {
				(*frequency)[position] -= 1
			} else {
				panic("unknown value")
			}
		}
	}
}

func isMostCommonBitOne(index int, frequency *map[int]int) bool {
	value := (*frequency)[index]

	if value >= 0 {
		return true
	}
	return false
}

func generateGammaRate(frequency *map[int]int) string {

	result := []string{}
	for index := 0; index < len(*frequency); index++ {
		if isMostCommonBitOne(index, frequency) {
			result = append(result, "1")
		} else {
			result = append(result, "0")
		}
	}
	return strings.Join(result, "")
}

func generateEpsilonRate(frequency *map[int]int) string {

	result := []string{}
	for index := 0; index < len(*frequency); index++ {
		if !isMostCommonBitOne(index, frequency) {
			result = append(result, "1")
		} else {
			result = append(result, "0")
		}
	}
	return strings.Join(result, "")
}

func filterInputByBitIndexValue(input []string, index int, value int) []string {
	result := []string{}

	for _, inputValue := range input {
		charValue := convertStringToInt(string([]rune(inputValue)[index]))

		if charValue == value {
			result = append(result, inputValue)
		}
	}

	return result
}

func generateOxygenGeneratorRate(input []string) string {
	filteredInput := input

	for index := 0; index < BINARY_STRING_INPUT_LENGTH; index++ {
		frequency := make(map[int]int)
		calculateFrequencyPerPosition(filteredInput, &frequency)

		if isMostCommonBitOne(index, &frequency) {
			filteredInput = filterInputByBitIndexValue(filteredInput, index, 1)
		} else {
			filteredInput = filterInputByBitIndexValue(filteredInput, index, 0)
		}

		if len(filteredInput) == 1 {
			break
		}
	}

	return filteredInput[0]
}

func generateCO2ScrubberRate(input []string) string {
	filteredInput := input

	for index := 0; index < BINARY_STRING_INPUT_LENGTH; index++ {
		frequency := make(map[int]int)
		calculateFrequencyPerPosition(filteredInput, &frequency)

		if isMostCommonBitOne(index, &frequency) {
			filteredInput = filterInputByBitIndexValue(filteredInput, index, 0)
		} else {
			filteredInput = filterInputByBitIndexValue(filteredInput, index, 1)
		}

		if len(filteredInput) == 1 {
			break
		}
	}

	return filteredInput[0]
}

func part1() {
	fmt.Println("Advent of Code day 3 part 1")

	input := readInputFromFile()

	frequency := make(map[int]int)

	calculateFrequencyPerPosition(input, &frequency)

	gammaRate := generateGammaRate(&frequency)
	epsilonRate := generateEpsilonRate(&frequency)

	powerConsumption := convertBinaryStringToInt(gammaRate) * convertBinaryStringToInt(epsilonRate)
	fmt.Println("Answer:", powerConsumption)
}

func part2() {
	fmt.Println("Advent of Code day 3 part 2")

	input := readInputFromFile()

	oxygenRate := generateOxygenGeneratorRate(input)
	co2Rate := generateCO2ScrubberRate(input)

	lifeSupportRating := convertBinaryStringToInt(oxygenRate) * convertBinaryStringToInt(co2Rate)
	fmt.Println("Answer:", lifeSupportRating)
}

func main() {
	part1()
	part2()
}
