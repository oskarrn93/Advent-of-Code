defmodule Day3 do
  def convert_character_to_value(char) do
    ascii_char = :binary.first(char)

    # convert from ascii value
    cond do
      # lower case char
      ascii_char >= 97 -> ascii_char - 96
      # upper case char
      true -> ascii_char - 38
    end
  end

  def setup() do
    {:ok, input} = File.read("input.txt")

    input
    |> String.trim()
    |> String.split("\n")
  end

  def get_overlapping_character([a, b]) do
    Enum.join(MapSet.to_list(MapSet.intersection(MapSet.new(a), MapSet.new(b))))
  end

  def get_overlapping_character([a, b, c]) do
    Enum.join(
      MapSet.to_list(
        MapSet.intersection(MapSet.intersection(MapSet.new(a), MapSet.new(b)), MapSet.new(c))
      )
    )
  end

  def part1 do
    setup()
    |> Enum.map(&String.split_at(&1, Integer.floor_div(String.length(&1), 2)))
    |> Enum.map(&Tuple.to_list(&1))
    |> Enum.map(&Enum.map(&1, fn x -> String.graphemes(x) end))
    |> Enum.map(&get_overlapping_character(&1))
    |> Enum.map(&convert_character_to_value(&1))
    |> Enum.sum()
    |> IO.inspect(label: "Part 1")
  end

  def part2 do
    setup()
    |> Enum.chunk_every(3)
    |> Enum.map(&Enum.map(&1, fn x -> String.graphemes(x) end))
    |> Enum.map(&get_overlapping_character(&1))
    |> Enum.map(&convert_character_to_value(&1))
    |> Enum.sum()
    |> IO.inspect(label: "Part 2")
  end
end

Day3.part1()
Day3.part2()
