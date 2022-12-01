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

func getMaxValues(values []int, size int) []int {

	sort.Ints(values)

	sort.Sort(sort.Reverse(sort.IntSlice(values)))

	return values[0:size]

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

	maxValues := getMaxValues(sumValues, 1)
	sumMaxValue := sumArray(maxValues)

	fmt.Println("Max value: ", sumMaxValue)
}

func part2() {
	fmt.Println("Advent of Code day 1 part 2")

	values := readInputFromFile()

	sumValues := sumArrayValues(values)

	maxValues := getMaxValues(sumValues, 3)
	sumMaxValues := sumArray(maxValues)

	fmt.Println("Sum Max value: ", sumMaxValues)
}

func main() {
	part1()
	part2()
}
