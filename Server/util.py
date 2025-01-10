import json
import pickle
import  numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
        # loc_index = np.where(x.columns == location)[0][0]

    p = np.zeros(len(__data_columns))
    p[0] = sqft
    p[1] = bath
    p[2] = bhk
    if loc_index >= 0:
        p[loc_index] = 1
    return round(__model.predict([p])[0],2)

def get_location_names():
    return __locations

def load_columns():
    print("loading columns from the column.json")
    global __data_columns
    global __locations
    with open("../Model/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]

    global __model
    with open("../Model/banglore_home_prices_model.pickle", 'rb') as f:
        __model = pickle.load(f)
    print("all done")

if __name__ == '__main__':
    load_columns()
    print(get_location_names())
    print(get_estimated_price("Sarjapur", 2250, 3, 3), "Lakhs")
    print(get_estimated_price("bhopal", 1000, 3, 3), "Lakhs")
    print(get_estimated_price("Hosa Road", 1063, 2, 2), "Lakhs")
    # print(get_estimated_price("Sarjapur", 2250, 3, 3), "Lakhs")
    print("khtm tata bye bye")