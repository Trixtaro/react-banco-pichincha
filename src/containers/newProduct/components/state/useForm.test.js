import { act, renderHook } from "@testing-library/react";
import { transformDate, useForm } from "./useForm";
import Router, { MemoryRouter } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useParams: jest.fn(),
}));

describe("transformDate", () => {
  it("should transformDate convert date into string", () => {
    const date = new Date();

    expect(transformDate(date)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("useForm", () => {
  const wrapper = ({ children, initialEntries = ["/"] }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router, "useParams").mockReturnValue({});
  });

  it("should useForm to clear data when handleRestart is called", () => {
    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    act(() => {
      result.current.functions.handleRestart();
    });

    expect(result.current.values.id).toBe("");
    expect(result.current.values.name).toBe("");
    expect(result.current.values.logo).toBe("");
    expect(result.current.values.description).toBe("");
  });

  it("should useForm to be new mode when params has no field id", () => {
    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    expect(result.current.values.mode).toBe("new");
  });

  it("should change values when onChange function is called", () => {
    const { result, rerender } = renderHook(() => useForm(), {
      wrapper,
    });

    expect(result.current.values.validForm).toBe(false);

    [
      { name: "id", value: "an id" },
      { name: "nombre", value: "a name" },
      { name: "descripcion", value: "a description" },
      { name: "logo", value: "a logo URL" },
      {
        name: "fecha_liberacion",
        value: "2040-10-22",
      },
      {
        name: "fecha_liberacion",
        value: "2010-10-22",
      },
    ].forEach((values) => {
      act(() => {
        result.current.functions.handleChange({ target: { ...values } }, true);
      });
    });

    rerender();

    expect(result.current.values.id).toBe("an id");
    expect(result.current.values.name).toBe("a name");
    expect(result.current.values.description).toBe("a description");

    expect(result.current.values.validForm).toBe(true);
  });

  it("should saveProducts return a 200 status", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));

    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    await act(async () => {
      await result.current.functions.saveProducts();
    });

    expect(mockedNavigate).toHaveBeenCalled();
  });

  it("should saveProducts return an error status", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 400,
      json: Promise.resolve({}),
    }));

    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    await act(async () => {
      await result.current.functions.saveProducts();
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("should updateProduct return a 200 status", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));

    jest.spyOn(Router, "useParams").mockReturnValue({
      id: "abc",
    });

    const { result, rerender } = renderHook(() => useForm(), {
      wrapper,
    });

    rerender();

    expect(result.current.values.mode).toBe("edit");

    await act(async () => {
      await result.current.functions.handleSubmit({
        preventDefault: jest.fn(),
      });
    });

    expect(mockedNavigate).toHaveBeenCalled();
  });
});
