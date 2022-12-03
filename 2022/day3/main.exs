defmodule Day3 do
  def setup() do
    {:ok, input} = File.read("input.txt")

    input
    |> String.trim()
    |> String.split("\n")
    |> Enum.map(&String.split_at(&1, Integer.floor_div(String.length(&1), 2)))
    |> Enum.map(&Tuple.to_list(&1))
    |> Enum.map(&Enum.map(&1, fn x -> String.graphemes(x) end))
    |> Enum.map(fn [a, b] ->
      MapSet.intersection(MapSet.new(a), MapSet.new(b))
    end)
    |> Enum.map(&MapSet.to_list(&1))
    |> Enum.map(&Enum.join(&1))
    |> Enum.map(&:binary.first(&1))
    |> Enum.map(fn x ->
      # convert from ascii value
      cond do
        # lower case char
        x >= 97 -> x - 96
        # upper case char
        true -> x - 38
      end
    end)
    |> Enum.sum()
  end

  def part1 do
    setup()
    |> IO.inspect(label: "Part 1")
  end
end

Day3.part1()
