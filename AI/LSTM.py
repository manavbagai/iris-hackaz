import json
import codecs
import keras
import numpy as np
from keras import layers, Model
import random


# Action Mapping for input to model
act_map = {"Backspace": 0.1, "Compile_Err": 0.4, "Runtine_Err": 1.0, "Deprecated": 0.2, "WARN_MIN": 0.2,
"WARN_MAJ":0.3,
"Obsolete_elements":0.1,
"Wrong_Font":0.2,
"Debug_Time":0.4,
"Syntax":0.3,
"Indentation":0.1}


def parse_input(data):
    def parse_input(data):
        batch_data = []
        for k, v in data.items():
            final_data = []
            time_series = v["Time Series"]
            for x in time_series:
                temp_list = []
                temp_list.append(x['ts'])
                temp_list.append(x['v'])
                temp_list.append(act_map[x['A_Type']])
                final_data.append(temp_list)
            batch_data.append(final_data)
        return batch_data


def process_labels():
    train_y = []
    for i in range(5):
        inner_list = []
        for j in range(10):
            inner_list.append(random.random())
        train_y.append(inner_list)
    return np.reshape(train_y, (10, 5)).T


# Model architecture
def initializeModel():
    # Input Layer to feed the tweet sequence
    input_layer = layers.Input(shape=(5,100,))
    # Embedding Layer
    # embeddings_layer = layers.Embedding(len(self.dictionary) + 1, 300, weights=[self.embeddings_matrix], trainable=False)(
    #     input_layer)
    # LSTM layer
    lstm_layer = layers.LSTM(100, activation='tanh', dropout=0.2)(input_layer)
    # Dense layer to scale the output dimension
    dense_1 = layers.Dense(50, activation='relu')(lstm_layer)
    dense_2 = layers.Dense(10, activation='softmax')(dense_1)
    # Creating Model from the layers
    model = Model(inputs=input_layer, outputs=dense_2)
    model.compile(optimizer='Adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model



with open('Input_Data.json', 'r') as fr:
    data = json.load(fr)
trn_x = parse_input(data)
train_y = process_labels()
model = initializeModel()
model.fit(trn_x, train_y,
    batch_size=5,
    epochs=1,
    verbose=2,
    shuffle=True)
