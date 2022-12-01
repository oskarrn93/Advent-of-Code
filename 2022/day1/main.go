package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func readInputFromFile() [][]int {
	data, error := os.ReadFile("./input.txt")
	if error != nil {
		panic(error)
	}

	inputDataTrimmedString := strings.Trim(string(data), "\n")

	inputPerElf := strings.Split(inputDataTrimmedString, "\n\n")

	var result [][]int

	for _, value := range inputPerElf {
		var values []int

		strArr := strings.Split(value, "\n")
		for _, value := range strArr {
			values = append(values, convertStringToInt(value))

		}

		result = append(result, values)

	}

	return result
}

func sumArray(values []int) int {
	sum := 0

	for _, value := range values {
		sum += value
	}

	return sum
}

func sumArrayValues(values [][]int) []int {
	var result []int

	for _, value := range values {
		sum := sumArray(value)

		result = append(result, sum)
	}

	return result
}

func getMaxValue(values []int) int {
	sort.Ints(values)
	return values[len(values)-1]
}

func convertStringToInt(stingValue string) int {
	value, error := strconv.Atoi(stingValue)

	if error != nil {
		panic(error)
	}

	return value
}

func part1() {
	fmt.Println("Advent of Code day 1 part 1")

	values := readInputFromFile()

	sumValues := sumArrayValues(values)

	maxValue := getMaxValue(sumValues)

	fmt.Println("Max value: ", maxValue)

}

func main() {
	part1()

}
