import tkinter as tk
from tkinter import messagebox

# Function to handle button click
def greet():
    name = entry.get()
    if name.strip() == "":
        messagebox.showwarning("Input Error", "Please enter your name!")
    else:
        messagebox.showinfo("Greeting", f"Hello, {name}! Welcome to Python GUI.")

# Create main window
root = tk.Tk()
root.title("Python Frontend Example")
root.geometry("400x200")

# Label
label = tk.Label(root, text="Enter your name:", font=("Arial", 14))
label.pack(pady=10)

# Text Entry
entry = tk.Entry(root, font=("Arial", 14))
entry.pack(pady=5)

# Button
button = tk.Button(root, text="Greet Me", font=("Arial", 14), command=greet)
button.pack(pady=20)

# Run the GUI
root.mainloop()
