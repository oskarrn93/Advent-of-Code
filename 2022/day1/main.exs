defmodule Day1 do

  def main(nr_of_elfs) do
    {:ok, input} = File.read("input.txt")

    input
    |> String.trim()
    |> String.split("\n\n")
    |> Enum.map(&String.split(&1, "\n"))
    # |> IO.inspect(label: "test 1")
    |> Enum.map(&Enum.map(&1, fn calories -> {v, _} = Integer.parse(calories); v end))
    |> Enum.map(&Enum.sum/1)
    |> Enum.sort
    |> Enum.reverse
    |> Enum.take(nr_of_elfs)
    |> Enum.sum
  end

  def part1 do
    main(1)
    |> IO.inspect(label: "Part 1")
  end

  def part2 do
    main(3)
    |> IO.inspect(label: "Part 2")
  end

end

Day1.part1
Day1.part2
