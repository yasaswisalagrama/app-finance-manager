import re
import fitz  # PyMuPDF

def extract_text_from_protected_pdf(pdf_path, password):
    doc = fitz.open(pdf_path)

    if doc.is_encrypted:  # Check if the PDF is encrypted
        if not doc.authenticate(password):  # Try unlocking
            print("Incorrect password or unable to unlock PDF.")
            return None

    text = ""
    for page in doc:
        text += page.get_text("text") + "\n"  # Extract text from each page

    return text

# Example usage
pdf_file = r"C:\Users\Asus\Downloads\2025-23-1--21-14-11-Statement_1737647051744.pdf"  # Replace with your file
password = ""  # Replace with the actual password
bank_name = "ICICI"  # Replace with the actual bank name

#text extraction from pdf

def extract_transactions(text, bank_name="Unknown"):
    transactions = []
    lines = text.split("\n")
    cleaned_lines = [line.strip() for line in lines if line.strip() and line.strip().lower() != "null"]


    # Find all table headers dynamically
    transaction_pattern = re.compile(r"^\d{2}-\d{2}-\d{2}")  # Date format DD-MM-YY
    table_starts = []

    match bank_name:
        case "ICICI":
            print("Processing ICICI Bank format")
            for i in range(len(cleaned_lines) - 3):
                if (cleaned_lines[i] == "Date" and
                    cleaned_lines[i + 1] == "Description" and
                    cleaned_lines[i + 2] == "Amount" and
                    cleaned_lines[i + 3] == "Type"):
                    table_starts.append(i + 4)  # Add the index after the header

            if not table_starts:
                print("Transaction table not found.")
                return []

            float_regex = re.compile(r"^\d+\.\d+$")

            # Process each table separately
            for start_index in table_starts:
                i = start_index
                while i < len(cleaned_lines):
                    if i + 3 >= len(cleaned_lines):
                        break  # Avoid incomplete rows

                    # Validate that the first column is a valid date
                    if not transaction_pattern.match(cleaned_lines[i]):
                        i += 1
                        continue  # Skip until we find a valid date

                    description = []
                    j = i + 1
                    while j < len(cleaned_lines) and not float_regex.match(cleaned_lines[j]):
                        description.append(cleaned_lines[j])
                        j += 1  # Move to the next line

                    transactions.append({
                        "date": cleaned_lines[i],
                        "Description": " ".join(description) if description else None,
                        "Amount": cleaned_lines[j] if j < len(cleaned_lines) and cleaned_lines[j] != "-" else None,
                        "Type": cleaned_lines[j + 1] if j + 1 < len(cleaned_lines) and cleaned_lines[j + 1] != "-" else None
                    })
                    
                    i = j + 2  # Move to the next row in the table

        case "SBI":
            print("SBI")
            for i in range(len(cleaned_lines) - 5):
                if (cleaned_lines[i] == "Date" and
                    cleaned_lines[i + 1] == "Transaction Reference" and
                    cleaned_lines[i + 2] == "Ref.No./Chq.No." and
                    cleaned_lines[i + 3] == "Credit" and
                    cleaned_lines[i + 4] == "Debit" and
                    cleaned_lines[i + 5] == "Balance"):
                    table_starts.append(i + 6)  # Add the index after the header

            if not table_starts:
                print("Transaction table not found.")
                return []

            # Process each table separately
            for start_index in table_starts:
                for i in range(start_index, len(cleaned_lines), 6):
                    if i + 5 >= len(cleaned_lines):
                        break  # Avoid incomplete rows

                    # Validate that the first column is a valid date
                    if not transaction_pattern.match(cleaned_lines[i]):
                        break  # Stop this table if we reach non-transaction data

                    transactions.append({
                        "date": cleaned_lines[i],
                        "transaction_ref": cleaned_lines[i + 1],
                        "ref_no": cleaned_lines[i + 2] if cleaned_lines[i + 2] != "-" else None,
                        "credit": float(cleaned_lines[i + 3].replace(",", "")) if cleaned_lines[i + 3] != "-" else 0.0,
                        "debit": float(cleaned_lines[i + 4].replace(",", "")) if cleaned_lines[i + 4] != "-" else 0.0,
                        "balance": float(cleaned_lines[i + 5].replace(",", "")) if cleaned_lines[i + 5] != "-" else 0.0
                    })
        case _:
            print("Unknown bank format")

    # for i in range(len(cleaned_lines) - 5):
    #     if (cleaned_lines[i] == "Date" and
    #         cleaned_lines[i + 1] == "Transaction Reference" and
    #         cleaned_lines[i + 2] == "Ref.No./Chq.No." and
    #         cleaned_lines[i + 3] == "Credit" and
    #         cleaned_lines[i + 4] == "Debit" and
    #         cleaned_lines[i + 5] == "Balance"):
    #         table_starts.append(i + 6)  # Add the index after the header

    # if not table_starts:
    #     print("Transaction table not found.")
    #     return []

    # # Process each table separately
    # for start_index in table_starts:
    #     for i in range(start_index, len(cleaned_lines), 6):
    #         if i + 5 >= len(cleaned_lines):
    #             break  # Avoid incomplete rows

    #         # Validate that the first column is a valid date
    #         if not transaction_pattern.match(cleaned_lines[i]):
    #             break  # Stop this table if we reach non-transaction data

    #         transactions.append({
    #             "date": cleaned_lines[i],
    #             "transaction_ref": cleaned_lines[i + 1],
    #             "ref_no": cleaned_lines[i + 2] if cleaned_lines[i + 2] != "-" else None,
    #             "credit": float(cleaned_lines[i + 3].replace(",", "")) if cleaned_lines[i + 3] != "-" else 0.0,
    #             "debit": float(cleaned_lines[i + 4].replace(",", "")) if cleaned_lines[i + 4] != "-" else 0.0,
    #             "balance": float(cleaned_lines[i + 5].replace(",", "")) if cleaned_lines[i + 5] != "-" else 0.0
    #        })

    return transactions

# Extract and process transactions
extracted_text = extract_text_from_protected_pdf(pdf_file, password)
if extracted_text:
    transactions = extract_transactions(extracted_text, bank_name)
    for tx in transactions:
        print(tx)