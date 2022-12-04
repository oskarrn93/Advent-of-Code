defmodule Day4 do
  def setup() do
    {:ok, input} = File.read("input.txt")

    input
    |> String.trim()
    |> String.split("\n")
    |> Enum.flat_map(&String.split(&1, ","))
    |> Enum.flat_map(&String.split(&1, "-"))
    |> Enum.map(fn x ->
      {v, _} = Integer.parse(x)
      v
    end)
    |> Enum.chunk_every(2)
    |> Enum.map(fn [a, b] -> MapSet.new(Range.new(a, b)) end)
    |> Enum.chunk_every(2)
    |> Enum.map(fn [a, b] ->
      intersect_numbers = MapSet.intersection(a, b)
      length_intersect_numbers = MapSet.size(intersect_numbers)

      length_a = MapSet.size(a)
      length_b = MapSet.size(b)

      case length_intersect_numbers do
        ^length_a -> 1
        ^length_b -> 1
        _ -> 0
      end
    end)
    |> Enum.sum()
  end

  def part1 do
    setup()
    |> IO.inspect(label: "Part 1")
  end
end

Day4.part1()
