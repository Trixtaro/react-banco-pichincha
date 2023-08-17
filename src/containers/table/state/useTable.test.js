import { renderHook, act } from "@testing-library/react";
import { useTable } from "./useTable";

describe("useTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call setData when fetchGetProducts status is 200", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      json: () => Promise.resolve([{}, {}]),
    }));

    const { result, rerender } = renderHook(() => useTable());

    await act(async () => {
      result.current.functions.fetchProducts();
    });

    rerender();

    expect(result.current.values.data.length).toBe(2);
  });

  it("should data be empty when fetchGetProducts is rejected", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() => Promise.reject({}));

    const spyConsoleError = jest.spyOn(console, "error");
    spyConsoleError.mockImplementation(() => {});

    const { result, rerender } = renderHook(() => useTable());

    await act(async () => {
      result.current.functions.fetchProducts();
    });

    rerender();

    expect(spyConsoleError).toHaveBeenCalled();
  });

  it("should data be empty when deleteProduct is rejected", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() => Promise.reject({}));

    const spyConsoleError = jest.spyOn(console, "error");
    spyConsoleError.mockImplementation(() => {});

    const { result } = renderHook(() => useTable());

    await act(async () => {
      result.current.functions.handleDelete();
    });

    expect(spyConsoleError).toHaveBeenCalled();
  });

  it("should call fetchProducts when deleteProduct status is 200", async () => {
    const spyFetch = jest.spyOn(global, "fetch");

    spyFetch.mockImplementationOnce(() => ({
      status: 200,
      json: () => Promise.resolve(),
    }));

    const { result } = renderHook(() => useTable());

    await act(async () => {
      await result.current.functions.deleteProduct();
    });

    expect(spyFetch).toHaveBeenCalledTimes(3);
  });

  it("should handleChange change pagination value when a new value is typed", () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      json: () => Promise.resolve([]),
    }));

    const { result } = renderHook(() => useTable());

    expect(result.current.values.pagination).toBe("5");

    act(() => {
      result.current.functions.handleChange({
        target: {
          name: "random name",
          value: "random value",
        },
      });
    });

    expect(result.current.values.pagination).toBe("5");

    act(() => {
      result.current.functions.handleChange({
        target: {
          name: "paginacion",
          value: "10",
        },
      });
    });

    expect(result.current.values.pagination).toBe("10");
  });
});

describe("rejected cases", () => {});
