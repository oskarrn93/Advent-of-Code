defmodule Day4 do
  def setup() do
    {:ok, input} = File.read("input.txt")

    input
    |> String.trim()
    |> String.split("\n")
    |> Enum.flat_map(&String.splitter(&1, [",", "-"]))
    |> Enum.map(fn x ->
      {v, _} = Integer.parse(x)
      v
    end)
    |> Enum.chunk_every(2)
    |> Enum.map(fn [a, b] -> MapSet.new(Range.new(a, b)) end)
    |> Enum.chunk_every(2)
  end

  def part1 do
    setup()
    |> Enum.filter(fn [a, b] ->
      MapSet.subset?(a, b) or MapSet.subset?(b, a)
    end)
    |> Enum.count()
    |> IO.inspect(label: "Part 1")
  end

  def part2 do
    setup()
    |> Enum.filter(fn [a, b] ->
      MapSet.size(MapSet.intersection(a, b)) > 0
    end)
    |> Enum.count()
    |> IO.inspect(label: "Part 2")
  end
end

Day4.part1()
Day4.part2()
